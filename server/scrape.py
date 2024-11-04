from bs4 import BeautifulSoup
import requests

html_text = requests.get('https://www.holidify.com/country/india/packages.html').text
soup = BeautifulSoup(html_text, 'lxml')
packages = soup.find_all('div', class_='row no-gutters inventory-card')

for package in packages:
    details = package.find('div', class_='col-8 col-md-6 inventory-details')
    package_name = details.find('h3').text.strip()
    prices = package.find('p', class_='price').text.strip()
    print(f'''
    Company Name: {package_name}
    Price : {prices}
    ''')

    print('')