from django.urls import path
from .views import recommend_trips

urlpatterns = [
    path('recommend/<int:user_id>/', recommend_trips, name='recommend_trips'),
]