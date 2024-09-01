from django.urls import path
from . import views

urlpatterns = [
    path('generate/', views.generate_travel_plan, name='generate_travel_plan'),
]
