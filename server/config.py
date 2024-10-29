import secrets
from datetime import timedelta

class Config:
    # JWT Configuration
    JWT_SECRET_KEY = secrets.token_hex(32)  # Generates a secure random key
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)
    JWT_TOKEN_LOCATION = ['headers']
    JWT_HEADER_NAME = 'Authorization'
    JWT_HEADER_TYPE = 'Bearer'