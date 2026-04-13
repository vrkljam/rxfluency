# pthealthcare/serializers.py
# pthealthcare/serializers.py
from rest_framework import serializers
from .models import PTHealthcareDrug, DrugFact, DrugClass

class DrugFactSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugFact
        fields = ["id", "text", "category", "order"]

class DrugClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugClass
        fields = ["id", "name"]
        
        
class PTHealthcareDrugSerializer(serializers.ModelSerializer):
    facts = DrugFactSerializer(many=True, read_only=True)

    # READ: full objects for UI
    classes = DrugClassSerializer(many=True, read_only=True)

    # WRITE: IDs from frontend
    class_ids = serializers.PrimaryKeyRelatedField(
        queryset=DrugClass.objects.all(),
        many=True,
        write_only=True,
        source="classes",
        required=False
    )

    class Meta:
        model = PTHealthcareDrug
        fields = [
            "id",
            "name",
            "drug_class",   # legacy (keep for now)
            "classes",
            "class_ids",
            "notes",
            "facts",
        ]
        
    def update(self, instance, validated_data):
        classes = validated_data.pop("classes", None)

        instance = super().update(instance, validated_data)

        if classes is not None:
            instance.classes.set(classes)  # 🔥 THIS is the fix

        return instance