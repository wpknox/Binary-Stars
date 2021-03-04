from django.test import TestCase
from binarystars.models import BinaryStars
import random
# Create your tests here.


class BinaryStarTestCase(TestCase):
    def setup(self):
        BinaryStars.objects.create(
            mass_1=random.uniform(0, 1),
            mass_2=random.uniform(0, 1),
            lumin_1=random.uniform(0, 1),
            lumin_2=random.uniform(0, 1),
            porb=random.uniform(0, 1),
            time_id=random.uniform(0, 1),
        )

    def test_automatic_pass(self):
        self.assertEqual(1, 1)
