from django.test import Client, TestCase
from binarystars.models import Attribute, ClusterQueue, InterpolatedBinaryStars, BinaryStars


class BinaryStarsTestCase(TestCase):
    def setUp(self):
        pass

    def test_kmeans_time_steps(self):
        assert response.status_code == 200
