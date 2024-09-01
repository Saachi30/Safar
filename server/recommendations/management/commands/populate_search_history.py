import random
from django.core.management.base import BaseCommand
from recommendations.models import User, Trip, UserSearchHistory

class Command(BaseCommand):
    help = 'Populate the database with random search history data'

    def handle(self, *args, **kwargs):
        users = User.objects.all()
        trips = Trip.objects.all()

        for _ in range(50):
            user = random.choice(users)
            trip = random.choice(trips)
            search_history = UserSearchHistory(
                user=user,
                trip=trip
            )
            search_history.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated search history'))