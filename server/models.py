# models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone=Column(String(10), unique=True, nullable=False)
    password_hash = Column(String(256), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    search_history = relationship('SearchHistory', back_populates='user')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class TravelPackage(Base):
    __tablename__ = 'travel_packages'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    destination = Column(String(100), nullable=False)
    duration = Column(Integer, nullable=False)  # in days
    budget = Column(Float, nullable=False)
    description = Column(String(500), nullable=True)
    activities = Column(String(200), nullable=True)
    category = Column(String(50), nullable=False)  # e.g., adventure, luxury, budget

class SearchHistory(Base):
    __tablename__ = 'search_history'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    destination = Column(String(100), nullable=False)
    search_date = Column(DateTime, default=datetime.utcnow)
    user = relationship('User', back_populates='search_history')