from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Drug, Brand, DrugClass
from .serializers import DrugSerializer,DrugClassSerializer
import random


class RandomQuestion(APIView):
    def get(self, request):
        drugs = Drug.objects.prefetch_related("brands").all()

        if not drugs.exists():
            return Response(
                {"error": "No drugs in database"},
                status=status.HTTP_404_NOT_FOUND
            )

        mode = request.query_params.get("mode", "random")

        # Pick a random drug first
        drug = random.choice(list(drugs))

        if mode == "brand_to_generic":
            # Pick one brand linked to this drug
            brands = drug.brands.all()
            if not brands.exists():
                return Response(
                    {"error": "Drug has no associated brands"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            brand_for_question = random.choice(list(brands))

            # IMPORTANT: brand may link to multiple generics
            generics = brand_for_question.drugs.all()
            answer = [g.generic_name.lower() for g in generics]

            question = f"What is the generic name for {brand_for_question.name}?"
            question_type = "brand_to_generic"

        elif mode == "generic_to_brand":
            brands = drug.brands.all()
            if not brands.exists():
                return Response(
                    {"error": "Drug has no associated brands"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            answer = [b.name.lower() for b in brands]
            question = f"What is a brand name for {drug.generic_name}?"
            question_type = "generic_to_brand"

        else:
            # Random direction
            if random.choice([True, False]):
                brands = drug.brands.all()
                brand_for_question = random.choice(list(brands))
                generics = brand_for_question.drugs.all()
                answer = [g.generic_name.lower() for g in generics]
                question = f"What is the generic name for {brand_for_question.name}?"
                question_type = "brand_to_generic"
            else:
                brands = drug.brands.all()
                answer = [b.name.lower() for b in brands]
                question = f"What is a brand name for {drug.generic_name}?"
                question_type = "generic_to_brand"

        return Response({
            "question": question,
            "answer": answer,  # ALWAYS a list now
            "question_type": question_type,
        })


class DrugViewSet(viewsets.ModelViewSet):
    queryset = Drug.objects.prefetch_related("brands", "classes").all()
    serializer_class = DrugSerializer
    
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["is_top_200", "is_combination","classes"]
    search_fields = ["generic_name", "brands__name"]

    def get_permissions(self):
        if self.request.method in ["GET"]:
            return [AllowAny()]
        return [IsAdminUser()]
    
    

class DrugClassViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DrugClass.objects.all()
    serializer_class = DrugClassSerializer