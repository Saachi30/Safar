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
        packages_data = []
        for p in packages:
            package_dict = {
                'id': p.id,
                'name': p.name,
                'destination': p.location,
                'image': p.image,
                'duration': p.duration,
                'price': p.price,
                'location':p.location,
                'category': p.category,
                'description': p.description if hasattr(p, 'description') else '',
                'activities': p.activities if hasattr(p, 'activities') else '',
                'groupSize': p.groupSize
            }
            packages_data.append(package_dict)

        self.packages_df = pd.DataFrame(packages_data)

        self.packages_df['features'] = (
            self.packages_df['name'].fillna('') + ' ' +
            self.packages_df['destination'].fillna('') + ' ' +
            self.packages_df['category'].fillna('')
        )

        if 'description' in self.packages_df.columns:
            self.packages_df['features'] += ' ' + self.packages_df['description'].fillna('')

        if 'activities' in self.packages_df.columns:
            self.packages_df['features'] += ' ' + self.packages_df['activities'].fillna('')

        tfidf_matrix = self.vectorizer.fit_transform(self.packages_df['features'])
        self.similarity_matrix = cosine_similarity(tfidf_matrix)

    def get_recommendations(self, user_history, num_recommendations=5):
        if len(user_history) == 0 or self.packages_df is None:
            if self.packages_df is not None and not self.packages_df.empty:
                return self.packages_df.sample(min(num_recommendations, len(self.packages_df)))
            return pd.DataFrame()

        user_preferences = []
        for search in user_history:
            package_indices = self.packages_df[
                self.packages_df['name'].str.contains(search.destination, case=False, na=False) |
                self.packages_df['destination'].str.contains(search.destination, case=False, na=False)
            ].index

            if len(package_indices) > 0:
                user_preferences.extend(package_indices)

        if user_preferences:
            similarity_scores = np.mean([self.similarity_matrix[idx] for idx in user_preferences], axis=0)
            recommendations = self.packages_df.copy()
            recommendations['score'] = similarity_scores
            return recommendations.nlargest(num_recommendations, 'score')

        return self.packages_df.sample(min(num_recommendations, len(self.packages_df)))