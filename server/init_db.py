# init_db.py
from database import init_db, db_session, Base, engine
from models import User, TravelPackage, SearchHistory
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_sample_data():
    try:
        # Create sample users with hashed passwords
        users = [
            User(
                username="john_doe",
                email="john@example.com",
                password_hash=generate_password_hash("JohnPass123!"),
                created_at=datetime.utcnow()
            ),
            User(
                username="jane_smith",
                email="jane@example.com",
                password_hash=generate_password_hash("JanePass123!"),
                created_at=datetime.utcnow()
            ),
            User(
                username="admin",
                email="admin@safar.com",
                password_hash=generate_password_hash("Admin@123"),
                created_at=datetime.utcnow()
            )
        ]
        for user in users:
            db_session.add(user)
        db_session.commit()  # Commit users first to get their IDs
        
        # Create sample packages
        packages = [
            TravelPackage(
                name="Paris Adventure",
                destination="Paris, France",
                duration=7,
                budget=2500.00,
                description="Experience the magic of Paris with our carefully curated 7-day adventure. Visit iconic landmarks, enjoy authentic French cuisine, and immerse yourself in Parisian culture.",
                activities="Eiffel Tower Visit, Louvre Museum Tour, Seine River Cruise, Notre-Dame Cathedral, Montmartre Walking Tour",
                category="adventure"
            ),
            TravelPackage(
                name="Tokyo Experience",
                destination="Tokyo, Japan",
                duration=10,
                budget=3000.00,
                description="Dive into the fascinating blend of traditional and modern Japan with our 10-day Tokyo experience. From ancient temples to futuristic technology.",
                activities="Temples, Sushi Making Class, Mount Fuji Tour, Anime District Visit, Tea Ceremony",
                category="cultural"
            ),
            TravelPackage(
                name="Bali Retreat",
                destination="Bali, Indonesia",
                duration=5,
                budget=1500.00,
                description="Escape to paradise with our 5-day Bali retreat. Relax on pristine beaches, explore ancient temples, and rejuvenate your spirit.",
                activities="Spa Treatments, Yoga Sessions, Temple Visits, Beach Activities, Cooking Class",
                category="luxury"
            ),
            TravelPackage(
                name="Swiss Alps Adventure",
                destination="Switzerland",
                duration=6,
                budget=3500.00,
                description="Experience the majestic Swiss Alps with this thrilling 6-day adventure package. Perfect for outdoor enthusiasts and nature lovers.",
                activities="Skiing, Hiking, Cable Car Rides, Mountain Biking, Swiss Chocolate Workshop",
                category="adventure"
            ),
            TravelPackage(
                name="Dubai Luxury Escape",
                destination="Dubai, UAE",
                duration=4,
                budget=4000.00,
                description="Indulge in luxury with our 4-day Dubai package. Experience the perfect blend of modern luxury and Arabian culture.",
                activities="Desert Safari, Burj Khalifa Visit, Gold Souk Tour, Yacht Cruise, Shopping Festival",
                category="luxury"
            )
        ]
        for package in packages:
            db_session.add(package)
        db_session.commit()  # Commit packages before adding search history
        
        # Create sample search history
        searches = [
            SearchHistory(
                user_id=1,  # john_doe
                destination="Paris, France",
                search_date=datetime.utcnow()
            ),
            SearchHistory(
                user_id=1,  # john_doe
                destination="Tokyo, Japan",
                search_date=datetime.utcnow()
            ),
            SearchHistory(
                user_id=2,  # jane_smith
                destination="Bali, Indonesia",
                search_date=datetime.utcnow()
            ),
            SearchHistory(
                user_id=2,  # jane_smith
                destination="Switzerland",
                search_date=datetime.utcnow()
            ),
            SearchHistory(
                user_id=3,  # admin
                destination="Dubai, UAE",
                search_date=datetime.utcnow()
            )
        ]
        for search in searches:
            db_session.add(search)
        
        db_session.commit()
        print("Sample data created successfully!")
        
    except Exception as e:
        db_session.rollback()
        print(f"Error creating sample data: {str(e)}")
        raise e

def init_database():
    try:
        # Drop all tables
        print("Dropping existing tables...")
        Base.metadata.drop_all(bind=engine)
        
        # Create all tables
        print("Creating new tables...")
        init_db()
        
        # Create sample data
        print("Creating sample data...")
        create_sample_data()
        
        print("Database initialization completed successfully!")
        
    except Exception as e:
        print(f"Error initializing database: {str(e)}")
        raise e

if __name__ == "__main__":
    print("Starting database initialization...")
    init_database()