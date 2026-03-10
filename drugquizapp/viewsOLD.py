from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAdminUser
from .models import DrugPair,GenericDrug, BrandDrug
from .serializers import DrugPairSerializer
import random

# Create your views here.

class RandomQuestion(APIView):
    def get(self, request):
        # Count of BrandDrug objects
        brand_count = BrandDrug.objects.count()
        if brand_count == 0:
            return Response({"error": "no drugs in database"}, status=status.HTTP_404_NOT_FOUND)

        mode = request.query_params.get("mode", "random")

        # Decide whether we pick brand→generic or generic→brand
        if mode == "brand_to_generic":
            # pick a random BrandDrug
            brand = random.choice(list(BrandDrug.objects.all()))
            question = f"What is the generic name for {brand.name}?"
            answer = brand.generic.name.lower()
            question_type = "brand_to_generic"

        elif mode == "generic_to_brand":
            # pick a random GenericDrug
            generic = random.choice(list(GenericDrug.objects.all()))
            question = f"What is a brand name for {generic.name}?"
            # all possible correct brand names
            answer = [b.name.lower() for b in generic.brands.all()]
            question_type = "generic_to_brand"

        else:
            # random choice of direction
            if random.choice([True, False]):
                brand = random.choice(list(BrandDrug.objects.all()))
                question = f"What is the generic name for {brand.name}?"
                answer = brand.generic.name.lower()
                question_type = "brand_to_generic"
            else:
                generic = random.choice(list(GenericDrug.objects.all()))
                question = f"What is a brand name for {generic.name}?"
                answer = [b.name.lower() for b in generic.brands.all()]
                question_type = "generic_to_brand"

        data = {
            "question": question,
            "answer": answer,
            "question_type": question_type,
        }
        return Response(data)
    

# class DrugPairViewSet(viewsets.ModelViewSet):
#         queryset=DrugPair.objects.all()
#         serializer_class = DrugPairSerializer
#         permission_classes=[IsAdminUser]
        
        
class DrugPairViewSet(viewsets.ModelViewSet):
        queryset=DrugPair.objects.all()
        serializer_class = DrugPairSerializer
        permission_classes=[IsAdminUser]
from rest_framework.permissions import IsAdminUser, AllowAny

class DrugPairViewSet(viewsets.ModelViewSet):
    queryset = DrugPair.objects.all()
    serializer_class = DrugPairSerializer

    def get_permissions(self):
        if self.request.method in ["GET"]:
            return [AllowAny()]
        return [IsAdminUser()]

