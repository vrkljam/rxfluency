from rest_framework import serializers
from .models import Drug, DrugClass, Brand

class DrugClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugClass
        fields = ["id", "name", "class_type", "description"]  # include all relevant fields
        
class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model=Brand
        fields=["id", "name"]
        
class DrugSerializer(serializers.ModelSerializer):
    brands =BrandSerializer(many=True, read_only=True)
    classes = DrugClassSerializer(many=True, read_only=True)  # nested serializer
    class Meta:
        model = Drug
        fields = ["id", "brands", "generic_name", "classes", "is_top_200","is_combination", "is_verified", "description"]


# class DrugSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Drug
#         fields = "__all__"


# from rest_framework import serializers
# from .models import DrugPair


# class DrugPairSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DrugPair
#         fields = ['id', 'brand_name', 'generic_name','is_verified']
        

