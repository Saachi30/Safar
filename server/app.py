# app.py
from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from database import db_session, init_db
from models import User, TravelPackage, SearchHistory
from recommendation import RecommendationEngine
from datetime import datetime, timedelta
from config import Config
from flask_cors import CORS  # Add this import
import re

app = Flask(__name__)
app.config.from_object(Config)

# Updated CORS configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173"],  # Your React app's origin
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True
    }
})

# Test endpoint
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "CORS is working!"}), 200

# Configure JWT settings
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'

jwt = JWTManager(app)
recommendation_engine = RecommendationEngine()

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

# Helper functions
def is_valid_email(email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, email) is not None

def is_valid_password(password):
    # At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    return len(password) >= 4 and any(c.isupper() for c in password) and \
           any(c.islower() for c in password) and any(c.isdigit() for c in password)

# Basic route to test if API is working
@app.route('/')
def home():
    return jsonify({"message": "Welcome to Safar Travel Recommendation System API"}), 200

# Auth routes
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.json
    print(data)
    if not data or not all(k in data for k in ['username', 'email', 'password']):
        return jsonify({"error": "Username, email, and password are required"}), 400
    
    # Validate input
    if not is_valid_email(data['email']):
        return jsonify({"error": "Invalid email format"}), 400
    
    if not is_valid_password(data['password']):
        return jsonify({"error": "Password must be at least 8 characters and contain uppercase, lowercase, and numbers"}), 400
    
    try:
        # Check if user already exists
        existing_user = db_session.query(User).filter(
            (User.username == data['username']) | (User.email == data['email'])
        ).first()
        
        if existing_user:
            return jsonify({"error": "Username or email already exists"}), 409
        
        # Create new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            phone=data['phone'],
            created_at=datetime.utcnow()
        )
        new_user.set_password(data['password'])
        
        db_session.add(new_user)
        db_session.commit()
        
        # Generate tokens
        access_token = create_access_token(identity=new_user.id)
        refresh_token = create_refresh_token(identity=new_user.id)
        
        return jsonify({
            "message": "User created successfully",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email
            }
        }), 201
        
    except Exception as e:
        db_session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.json
    
    if not data or not all(k in data for k in ['email', 'password']):
        return jsonify({"error": "Email and password are required"}), 400
    
    try:
        # Find user by email
        user = db_session.query(User).filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({"error": "Invalid email or password"}), 401
        
        # Generate tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }), 200
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    
    return jsonify({
        "access_token": access_token
    }), 200

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = db_session.query(User).get(current_user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "created_at": user.created_at.isoformat()
    }), 200

# User routes
@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    users = db_session.query(User).all()
    return jsonify([{
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "created_at": user.created_at.isoformat()
    } for user in users]), 200

# Package routes - No authentication required
@app.route('/api/packages', methods=['GET'])
def get_packages():
    try:
        packages = db_session.query(TravelPackage).all()
        return jsonify({
            "status": "success",
            "packages": [{
                "id": p.id,
                "name": p.name,
                "destination": p.destination,
                "duration": p.duration,
                "budget": p.budget,
                "description": p.description,
                "activities": p.activities,
                "category": p.category
            } for p in packages]
        }), 200
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/packages', methods=['POST'])
def add_package():
    data = request.json
    required_fields = ['name', 'destination', 'duration', 'budget', 'category']
    
    if not data or not all(field in data for field in required_fields):
        return jsonify({
            "status": "error",
            "message": f"Required fields: {', '.join(required_fields)}"
        }), 400
    
    try:
        package = TravelPackage(
            name=data['name'],
            destination=data['destination'],
            duration=data['duration'],
            budget=float(data['budget']),
            description=data.get('description', ''),
            activities=data.get('activities', ''),
            category=data['category']
        )
        db_session.add(package)
        db_session.commit()
        
        # Update recommendation engine
        packages = db_session.query(TravelPackage).all()
        if packages:
            recommendation_engine.prepare_package_features(packages)
        
        return jsonify({
            "status": "success",
            "message": "Package added successfully",
            "package": {
                "id": package.id,
                "name": package.name,
                "destination": package.destination,
                "duration": package.duration,
                "budget": package.budget,
                "category": package.category
            }
        }), 201
    except Exception as e:
        db_session.rollback()
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

# Search routes
@app.route('/api/search', methods=['POST'])
@jwt_required()
def record_search():
    data = request.json
    if not data or 'destination' not in data:
        return jsonify({"error": "Destination is required"}), 400
    
    try:
        current_user_id = get_jwt_identity()
        search = SearchHistory(
            user_id=current_user_id,
            destination=data['destination']
        )
        db_session.add(search)
        db_session.commit()
        return jsonify({"message": "Search recorded successfully"}), 201
    except Exception as e:
        db_session.rollback()
        return jsonify({"error": str(e)}), 400

# Recommendations route
@app.route('/api/recommendations')
@jwt_required()
def get_recommendations():
    try:
        current_user_id = get_jwt_identity()
        
        # Verify user exists
        user = db_session.query(User).get(current_user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        # Get user's search history
        user_history = db_session.query(SearchHistory).filter_by(user_id=current_user_id)\
            .order_by(SearchHistory.search_date.desc()).all()
        
        # Check if we have packages
        packages = db_session.query(TravelPackage).all()
        if not packages:
            return jsonify({"message": "No packages available yet"}), 200
            
        # Update recommendation engine with current packages
        recommendation_engine.prepare_package_features(packages)
        
        # Get recommendations
        recommendations = recommendation_engine.get_recommendations(user_history)
        
        return jsonify({
            "recommendations": recommendations.to_dict(orient='records')
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    db_session.rollback()
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)