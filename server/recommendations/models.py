from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)

    def __str__(self):
        return self.username

class Trip(models.Model):
    name = models.CharField(max_length=100)
    destination = models.CharField(max_length=100)
    duration = models.IntegerField()  # Duration in days
    budget = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} in {self.destination}"

class UserSearchHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    search_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} searched for {self.trip.name}"