from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('travel-plan/', include('travel_plan.urls')),
    path('recommendations/', include('recommendations.urls')),
]
