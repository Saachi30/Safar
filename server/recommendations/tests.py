from django.test import TestCase
from django.urls import reverse
from .models import User, Trip, UserSearchHistory

class RecommendationTests(TestCase):

    def setUp(self):
        # Create a user
        self.user = User.objects.create(username='testuser')

        # Create multiple trips (at least 5)
        self.trip1 = Trip.objects.create(name='Trip 1', destination='Goa', duration=5, budget=2000)
        self.trip2 = Trip.objects.create(name='Trip 2', destination='Kerala', duration=7, budget=3000)
        self.trip3 = Trip.objects.create(name='Trip 3', destination='Rajasthan', duration=10, budget=4000)
        self.trip4 = Trip.objects.create(name='Trip 4', destination='Himachal Pradesh', duration=6, budget=2500)
        self.trip5 = Trip.objects.create(name='Trip 5', destination='Goa', duration=4, budget=1500)
        self.trip6 = Trip.objects.create(name='Trip 6', destination='Rajasthan', duration=8, budget=3500)

        # Create search history for the user
        UserSearchHistory.objects.create(user=self.user, trip=self.trip1)
        UserSearchHistory.objects.create(user=self.user, trip=self.trip2)
        UserSearchHistory.objects.create(user=self.user, trip=self.trip3)

    def test_recommendation_page(self):
        response = self.client.get(reverse('recommend_trips', args=[self.user.id]))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Recommended Trips')
        self.assertContains(response, 'Trip 1')  # Check if Trip 1 is in recommendations