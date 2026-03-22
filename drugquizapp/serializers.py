from rest_framework import serializers
from .models import Drug, DrugClass, Brand

class DrugClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugClass
        fields = ["id", "name", "class_type", "description"]

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name"]

class DrugSerializer(serializers.ModelSerializer):
    brands = BrandSerializer(many=True, read_only=True)
    classes = DrugClassSerializer(many=True, read_only=True)
    class_ids = serializers.PrimaryKeyRelatedField(
        queryset=DrugClass.objects.all(), many=True, write_only=True, source="classes"
    )
    brand_ids = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(), many=True, write_only=True, source="brands"
    )

    class Meta:
        model = Drug
        fields = [
            "id", "generic_name", "classes", "brands", "is_top_200",
            "is_combination", "is_verified", "description",
            "class_ids", "brand_ids"
        ]