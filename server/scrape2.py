# scrape2.py
from bs4 import BeautifulSoup
import requests

def scrape_packages():
    try:
        html_text = requests.get('https://www.holidify.com/country/india/packages.html').text
        soup = BeautifulSoup(html_text, 'lxml')
        packages = soup.find_all('div', class_='row no-gutters inventory-card')
        
        scraped_items = []
        for package in packages:
            try:
                details = package.find('div', class_='col-8 col-md-6 inventory-details')
                package_name = details.find('h3').text.strip() if details and details.find('h3') else "N/A"
                price = package.find('p', class_='price').text.strip() if package.find('p', class_='price') else "N/A"
                places = package.find('p', class_='places-covered').text.strip() if package.find('p', class_='places-covered') else "N/A"
                images = package.find('img', class_='w-100 lazy')
                
                # Get the image URL if available
                image_url = images.get('data-original') if images else images.get('src') if images else None
                
                scraped_items.append({
                    "name": package_name,
                    "price": price,
                    "places": places,
                    "image": image_url
                })
            except Exception as e:
                print(f"Error processing package: {str(e)}")
                continue
        
        return {
            "status": "success",
            "items": scraped_items
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }