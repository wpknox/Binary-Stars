from rest_framework import serializers
from .models import Hero

#Test serializer used in tutorial
class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('name', 'alias')