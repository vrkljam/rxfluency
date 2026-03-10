# pthealthcare/serializers.py
# pthealthcare/serializers.py
from rest_framework import serializers
from .models import PTHealthcareDrug, DrugFact

class DrugFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugFact
        fields = ["id", "text", "category", "order"]

class PTHealthcareDrugSerializer(serializers.ModelSerializer):
    facts = DrugFactSerializer(many=True, read_only=True)  # <--- include facts

    class Meta:
        model = PTHealthcareDrug
        fields = ["id", "name", "drug_class", "notes", "facts"]