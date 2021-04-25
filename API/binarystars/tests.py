from django.test import Client, TestCase
from binarystars.models import Attribute, ClusterQueue, InterpolatedBinaryStars, BinaryStars


class BinaryStarsTestCase(TestCase):
    def setUp(self):
        pass

    def test_kmeans_time_steps1(self):
        response = c.post('/api/binarystars/cluster', {
            "n_clusters": 3,
            "n_samples": 0,
            "eps": 0,
            "standardizer": "minmax",
            "cluster_type": "kmeans",
            "time_steps": 1,
            "starting_time_step": 1,
            "attributes": {
                "mass_1": 0.33,
                "lumin_1": 0.33,
                "porb": 0.34
            }
        })

        assert response.status_code == 200
        assert len(response.context['time_steps']) == 1

    def test_kmeans_time_steps2(self):
        response = c.post('/api/binarystars/cluster', {
            "n_clusters": 3,
            "n_samples": 0,
            "eps": 0,
            "standardizer": "minmax",
            "cluster_type": "kmeans",
            "time_steps": 2,
            "starting_time_step": 1,
            "attributes": {
                "mass_1": 0.33,
                "lumin_1": 0.33,
                "porb": 0.34
            }
        })

        assert response.status_code == 200
        assert len(response.context['time_steps']) == 2

    def test_incorrect_kmeans(self):
        response = c.post('/api/binarystars/cluster', {
            "n_clusters": 3,
            "n_samples": 0,
            "eps": 0,
            "standardizer": "minmax",
            "cluster_type": "kmeans",
            "starting_time_step": 1,
            "attributes": {
                "mass_1": 0.33,
                "lumin_1": 0.33,
                "porb": 0.34
            }
        })

        assert response.status_code == 400
