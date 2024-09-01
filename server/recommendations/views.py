import numpy as np
import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.decomposition import NMF
from sklearn.metrics.pairwise import cosine_similarity
from django.shortcuts import render
from recommendations.models import Trip, User, UserSearchHistory

# def recommend_trips(request, user_id):
#     user = User.objects.get(id=user_id)
#     user_search_history = UserSearchHistory.objects.filter(user=user)
#     user_trip_history = [search.trip for search in user_search_history]

#     # Create a trip feature matrix
#     trip_data = pd.DataFrame(list(Trip.objects.all().values()))
#     trip_features = pd.get_dummies(trip_data[['destination', 'duration', 'budget']])

#     # Debugging: Print the trip features DataFrame
#     print("Trip Features DataFrame:")
#     print(trip_features)

#     # Check if user_trip_history is empty
#     if not user_trip_history:
#         print("No search history for user:", user_id)
#         return render(request, 'recommendations/recommendations.html', {'recommended_trips': []})

#     # Ensure trip IDs are valid
#     try:
#         user_profile = np.mean([trip_features.loc[trip.id].values for trip in user_trip_history], axis=0)
#     except KeyError as e:
#         print(f"KeyError: {e} - Check if trip IDs exist in trip_features.")
#         return render(request, 'recommendations/recommendations.html', {'recommended_trips': []})

#     # Content-Based Filtering
#     user_profile = np.mean([trip_features.loc[trip.id].values for trip in user_trip_history], axis=0)
#     distances, indices = model.kneighbors(user_profile.reshape(1, -1))
#     content_based_recommendations = trip_data.iloc[indices[0]]

#     # Collaborative Filtering
#     user_item_matrix = pd.DataFrame(1, index=range(1), columns=trip_data['id'])
#     model = NMF(n_components=2, init='random', random_state=0)
#     user_features = model.fit_transform(user_item_matrix)
#     trip_features = model.components_
#     trip_similarities = cosine_similarity(trip_features)
#     collaborative_recommendations = trip_data.iloc[trip_similarities[0].argsort()[-5:][::-1]]

#     # Combine recommendations
#     hybrid_recommendations = pd.concat([content_based_recommendations, collaborative_recommendations])
#     hybrid_recommendations = hybrid_recommendations.drop_duplicates().reset_index(drop=True)

#     context = {'recommended_trips': hybrid_recommendations}
#     return render(request, 'recommendations/recommendations.html', context)

def recommend_trips(request, user_id):
    user = User.objects.get(id=user_id)
    user_search_history = UserSearchHistory.objects.filter(user=user)
    user_trip_history = [search.trip for search in user_search_history]

    # Create a trip feature matrix
    trip_data = pd.DataFrame(list(Trip.objects.all().values()))
    trip_features = pd.get_dummies(trip_data[['id', 'destination', 'duration', 'budget']])
    trip_features.set_index('id', inplace=True)  # Set the trip ID as the index

    # Debugging: Print the trip features DataFrame
    print("Trip Features DataFrame:")
    print(trip_features)

    # Check if user_trip_history is empty
    if not user_trip_history:
        print("No search history for user:", user_id)
        return render(request, 'recommendations/recommendations.html', {'recommended_trips': []})

    # Ensure trip IDs are valid
    try:
        user_profile = np.mean([trip_features.loc[trip.id].values for trip in user_trip_history], axis=0)
        print("User Profile:", user_profile)  # Debugging: Print the user profile
    except KeyError as e:
        print(f"KeyError: {e} - Check if trip IDs exist in trip_features.")
        return render(request, 'recommendations/recommendations.html', {'recommended_trips': []})

    # Content-Based Filtering
    model = NearestNeighbors(metric='cosine')
    model.fit(trip_features)

    # Find nearest neighbors
    distances, indices = model.kneighbors(user_profile.reshape(1, -1), n_neighbors=5)
    print("Distances:", distances)  # Debugging: Print distances
    print("Indices:", indices)  # Debugging: Print indices

    # Get content-based recommendations
    content_based_recommendations = trip_data.iloc[indices[0]]
    print("Content-Based Recommendations:")
    print(content_based_recommendations)  # Debugging: Print recommendations

    # Check if we have recommendations
    if content_based_recommendations.empty:
        print("No recommendations found.")
        return render(request, 'recommendations/recommendations.html', {'recommended_trips': []})

    # Combine recommendations (if you have collaborative filtering)
    # For now, we will just return content-based recommendations
    context = {'recommended_trips': content_based_recommendations}
    return render(request, 'recommendations/recommendations.html', context)