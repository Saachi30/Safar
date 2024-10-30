# init_db.py
from database import init_db, db_session, Base, engine
from models import User, TravelPackage, SearchHistory
from werkzeug.security import generate_password_hash
from datetime import datetime

def create_sample_data():
    try:
        # Create sample users (keeping existing users)
        users = [
            User(
                username="john_doe",
                email="john@example.com",
                phone="987613456",
                password_hash=generate_password_hash("JohnPass123!"),
                created_at=datetime.utcnow()
            ),
            User(
                username="jane_smith",
                email="jane@example.com",
                phone="6765412347",
                password_hash=generate_password_hash("JanePass123!"),
                created_at=datetime.utcnow()
            ),
            User(
                username="admin",
                email="admin@safar.com",
                phone="9876561029",
                password_hash=generate_password_hash("Admin@123"),
                created_at=datetime.utcnow()
            )
        ]
        for user in users:
            db_session.add(user)
        db_session.commit()

        # Create packages matching frontend data
        packages = [
            TravelPackage(
                name="Lakshadweep",
                image="https://www.fabhotels.com/blog/wp-content/uploads/2024/01/bbec4647-lakshadweep-1.jpg",
                price="35,000",
                duration="6 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="Experience the pristine beaches and crystal clear waters of Lakshadweep",
                activities="Snorkeling, Scuba Diving, Island Hopping"
            ),
            TravelPackage(
                name="Himachal Pradesh",
                image="https://www.fabhotels.com/blog/wp-content/uploads/2024/02/b39a81e3-himachal-pradesh.jpg",
                price="28,000",
                duration="4 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="Explore the majestic mountains and valleys of Himachal Pradesh",
                activities="Trekking, Camping, Paragliding"
            ),
            TravelPackage(
                name="Kedarnath",
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxW33faZi-REGBj2wU7q5RwfuN-bmnqGHdg&s",
                price="22,000",
                duration="5 Days",
                groupSize="20+",
                location="India",
                category="pilgrimage",
                description="Sacred pilgrimage to Kedarnath temple",
                activities="Temple Visit, Trekking, Meditation"
            ),
            TravelPackage(
                name="Bali",
                image="https://digital.ihg.com/is/image/ihg/intercontinental-bali-9719167392-2x1",
                price="75,000",
                duration="7 Days",
                groupSize="10+",
                location="Indonesia",
                category="leisure",
                description="A tropical paradise with beaches, temples, and rich culture",
                activities="Beach Relaxing, Sightseeing, Temple Tours"
            ),
            TravelPackage(
                name="Jaipur",
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuDD8CIjBDuVukV24jBDSDnW6-DUu3qrzpeQ&s",
                price="25,000",
                duration="4 Days",
                groupSize="15+",
                location="India",
                category="leisure",
                description="Discover the royal heritage of Jaipur, the Pink City",
                activities="Fort Tours, Cultural Visits, Shopping"
            ),
            TravelPackage(
                name="Kashmir",
                image="https://www.khyberhotels.com/blog/wp-content/uploads/2023/10/winter-kashmir.jpg",
                price="32,000",
                duration="6 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="The mesmerizing beauty of Kashmir awaits you",
                activities="Shikara Ride, Trekking, Snow Sports"
            ),
            TravelPackage(
                name="Agra",
                image="https://cdn.britannica.com/25/155325-050-79CFFB62/Taj-Mahal-Agra-India.jpg",
                price="18,000",
                duration="3 Days",
                groupSize="20+",
                location="India",
                category="pilgrimage",
                description="Visit the iconic Taj Mahal and other historical wonders",
                activities="Historical Tours, Taj Mahal Visit, Sightseeing"
            ),
            TravelPackage(
                name="Kaziranga",
                image="https://www.kaziranganationalpark-india.com/blog/wp-content/uploads/2022/08/kaziranga-wildlife-2.jpg",
                price="24,000",
                duration="4 Days",
                groupSize="12+",
                location="India",
                category="adventure",
                description="Explore the wildlife of Kaziranga National Park",
                activities="Safari, Bird Watching, Wildlife Photography"
            ),
            TravelPackage(
                name="Goa",
                image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg?w=600&h=500&s=1",
                price="30,000",
                duration="5 Days",
                groupSize="15+",
                location="India",
                category="leisure",
                description="Sun, sand, and sea in the tropical paradise of Goa",
                activities="Beach Parties, Water Sports, Nightlife"
            ),
            TravelPackage(
                name="Kerala",
                image="https://akm-img-a-in.tosshub.com/indiatoday/images/story/201701/kstory_647_010317124538.jpg",
                price="32,000",
                duration="6 Days",
                groupSize="15+",
                location="India",
                category="leisure",
                description="The tranquil backwaters and lush greenery of Kerala",
                activities="Houseboat Ride, Ayurveda, Backwater Tours"
            ),
            TravelPackage(
                name="Manali",
                image="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/1200px-Manali_City.jpg",
                price="26,000",
                duration="5 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="Adventure and serenity in the beautiful hill station of Manali",
                activities="Skiing, Paragliding, Trekking"
            ),
            TravelPackage(
                name="Shimla",
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4p6G9CLhkyw5uFV5NUazIng_mq5yuYgBd0A&s",
                price="24,000",
                duration="4 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="A charming hill station with colonial architecture",
                activities="Mountain Hiking, Sightseeing, Shopping"
            ),
            TravelPackage(
                name="Darjeeling",
                image="https://hikerwolf.com/wp-content/uploads/2020/04/Darjeeling-toy-train-route.jpg",
                price="28,000",
                duration="5 Days",
                groupSize="12+",
                location="India",
                category="leisure",
                description="The tea gardens and breathtaking views of Darjeeling",
                activities="Tea Garden Tours, Sightseeing, Toy Train Ride"
            ),
            TravelPackage(
                name="Munnar",
                image="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/goa.jpg",
                price="25,000",
                duration="4 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="The rolling hills and tea estates of Munnar",
                activities="Tea Garden Tours, Trekking, Wildlife Safari"
            ),
            TravelPackage(
                name="Ooty",
                image="https://hikerwolf.com/wp-content/uploads/2020/04/Darjeeling-toy-train-route.jpg",
                price="23,000",
                duration="4 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="The Queen of Hill Stations with cool climate and scenic views",
                activities="Mountain Hiking, Botanical Garden Visit, Toy Train Ride"
            ),
            TravelPackage(
                name="Coorg",
                image="https://www.holidify.com/images/bgImages/COORG.jpg",
                price="27,000",
                duration="5 Days",
                groupSize="15+",
                location="India",
                category="adventure",
                description="A serene hill station known for coffee plantations",
                activities="Coffee Plantation Tour, Trekking, Waterfalls"
            )
        ]
        
        for package in packages:
            db_session.add(package)
        db_session.commit()
        
        print("Sample data created successfully!")
        
    except Exception as e:
        db_session.rollback()
        print(f"Error creating sample data: {str(e)}")
        raise e

def init_database():
    try:
        print("Dropping existing tables...")
        Base.metadata.drop_all(bind=engine)
        
        print("Creating new tables...")
        init_db()
        
        print("Creating sample data...")
        create_sample_data()
        
        print("Database initialization completed successfully!")
        
    except Exception as e:
        print(f"Error initializing database: {str(e)}")
        raise e

if __name__ == "__main__":
    print("Starting database initialization...")
    init_database()
