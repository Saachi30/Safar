import random
from django.core.management.base import BaseCommand
from recommendations.models import Trip

class Command(BaseCommand):
    help = 'Populate the database with random trip data'

    def handle(self, *args, **kwargs):
        destinations = ['Goa', 'Kerala', 'Rajasthan', 'Himachal Pradesh', 'Bali', 'Mumbai']
        for i in range(10):
            trip = Trip(
                name=f"Trip {i + 1}",
                destination=random.choice(destinations),
                duration=random.randint(2, 14),
                budget=random.uniform(1000, 5000)
            )
            trip.save()
        self.stdout.write(self.style.SUCCESS('Successfully populated trips'))