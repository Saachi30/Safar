# recommendation.py
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

class RecommendationEngine:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.similarity_matrix = None
        self.packages_df = None
    
    def prepare_package_features(self, packages):
        # Convert SQLAlchemy objects to dictionary
        packages_data = []
        for p in packages:
            package_dict = {
                'id': p.id,
                'name': p.name,
                'destination': p.destination,
                'duration': p.duration,
                'budget': p.budget,
                'category': p.category
            }
            
            # Handle optional fields that might be None
            package_dict['description'] = p.description if hasattr(p, 'description') else ''
            package_dict['activities'] = p.activities if hasattr(p, 'activities') else ''
            
            packages_data.append(package_dict)
        
        # Convert to DataFrame
        self.packages_df = pd.DataFrame(packages_data)
        
        # Create feature text by combining available fields
        self.packages_df['features'] = (
            self.packages_df['destination'].fillna('') + ' ' +
            self.packages_df['name'].fillna('') + ' ' +
            self.packages_df['category'].fillna('')
        )
        
        if 'description' in self.packages_df.columns:
            self.packages_df['features'] += ' ' + self.packages_df['description'].fillna('')
        
        if 'activities' in self.packages_df.columns:
            self.packages_df['features'] += ' ' + self.packages_df['activities'].fillna('')
        
        # Create TF-IDF matrix
        tfidf_matrix = self.vectorizer.fit_transform(self.packages_df['features'])
        self.similarity_matrix = cosine_similarity(tfidf_matrix)
    
    def get_recommendations(self, user_history, num_recommendations=5):
        if len(user_history) == 0 or self.packages_df is None:
            # Return random packages if no history or no packages
            if self.packages_df is not None and not self.packages_df.empty:
                return self.packages_df.sample(min(num_recommendations, len(self.packages_df)))
            return pd.DataFrame()  # Return empty DataFrame if no packages exist
        
        # Get similarity scores for each package based on user history
        user_preferences = []
        for search in user_history:
            # Find packages similar to user's searched destinations
            package_indices = self.packages_df[
                self.packages_df['destination'].str.contains(search.destination, case=False, na=False)
            ].index
            
            if len(package_indices) > 0:
                user_preferences.extend(package_indices)
        
        if not user_preferences:
            return self.packages_df.sample(min(num_recommendations, len(self.packages_df)))
        
        # Calculate average similarity scores
        similarity_scores = np.mean([
            self.similarity_matrix[idx] for idx in user_preferences
        ], axis=0)
        
        # Get top recommendations
        package_indices = similarity_scores.argsort()[::-1][:num_recommendations]
        return self.packages_df.iloc[package_indices]