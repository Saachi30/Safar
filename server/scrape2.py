# scrape2.py
from bs4 import BeautifulSoup
import requests
from database import db_session
from models import TravelPackage

def clean_price(price_str):
    # Extract numeric value and convert to standard format
    import re
    numbers = re.findall(r'\d+', price_str)
    if numbers:
        return f"₹{numbers[0]}"
    return "Price on request"

def clean_duration(places_str):
    # Extract duration from places string or return default
    import re
    duration_match = re.search(r'(\d+)\s*(?:Days?|Nights?)', places_str, re.IGNORECASE)
    if duration_match:
        return f"{duration_match.group(1)} Days"
    return "5 Days"  # Default duration

def scrape_and_store_packages():
    try:
        html_text = requests.get('https://www.holidify.com/country/india/packages.html').text
        soup = BeautifulSoup(html_text, 'lxml')
        packages = soup.find_all('div', class_='row no-gutters inventory-card')
        
        # Clear existing packages from database
        db_session.query(TravelPackage).delete()
        
        for package in packages:
            try:
                details = package.find('div', class_='col-8 col-md-6 inventory-details')
                name = details.find('h3').text.strip() if details and details.find('h3') else "Package"
                price_elem = package.find('p', class_='price')
                price = clean_price(price_elem.text.strip()) if price_elem else "₹29999"
                places_elem = package.find('p', class_='places-covered')
                places = places_elem.text.strip() if places_elem else "Multiple destinations"
                images = package.find('img', class_='w-100 lazy')
                image_url = images.get('data-original') if images else images.get('src') if images else "/default-package.jpg"
                
                # Create new package with standardized format
                new_package = TravelPackage(
                    name=name,
                    image=image_url,
                    price=price,
                    duration=clean_duration(places),
                    groupSize="2-10",  # Default group size
                    location=places[:100],  # Limit location string length
                    description=f"Explore {places}",
                    activities="Sightseeing, Local Experiences",
                    category="Holiday"  # Default category
                )
                
                db_session.add(new_package)
            
            except Exception as e:
                print(f"Error processing package: {str(e)}")
                continue
        
        db_session.commit()
        return True
        
    except Exception as e:
        db_session.rollback()
        print(f"Error in scraping: {str(e)}")
        return False
