from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import Drug
from .serializers import DrugSerializer
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

        drug = random.choice(drugs)

        if mode == "brand_to_generic":
            # pick a random brand to display in the question
            brand_names = [b.name for b in drug.brands.all()]
            brand_for_question = random.choice(brand_names)
            question = f"What is the generic name for {brand_for_question}?"
            answer = drug.generic_name.lower()  # keep combos as-is
            question_type = "brand_to_generic"

        elif mode == "generic_to_brand":
            question = f"What is a brand name for {drug.generic_name}?"
            # return all associated brand names as acceptable answers
            answer = [b.name.lower() for b in drug.brands.all()]
            question_type = "generic_to_brand"

        else:
            if random.choice([True, False]):
                brand_names = [b.name for b in drug.brands.all()]
                brand_for_question = random.choice(brand_names)
                question = f"What is the generic name for {brand_for_question}?"
                answer = drug.generic_name.lower()
                question_type = "brand_to_generic"
            else:
                question = f"What is a brand name for {drug.generic_name}?"
                answer = [b.name.lower() for b in drug.brands.all()]
                question_type = "generic_to_brand"

        data = {
            "question": question,
            "answer": answer,
            "question_type": question_type,
        }

        return Response(data)

class DrugViewSet(viewsets.ModelViewSet):
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer

    def get_permissions(self):
        if self.request.method in ["GET"]:
            return [AllowAny()]
        return [IsAdminUser()]
    
    
    
    
# class RandomQuestion(APIView):
#     def get(self, request):
#         drugs = Drug.objects.all()

#         if not drugs.exists():
#             return Response(
#                 {"error": "No drugs in database"},
#                 status=status.HTTP_404_NOT_FOUND
#             )

#         mode = request.query_params.get("mode", "random")

#         drug = random.choice(drugs)

#         if mode == "brand_to_generic":
#             question = f"What is the generic name for {drug.brand_name}?"
#             answer = drug.generic_name.lower()
#             question_type = "brand_to_generic"

#         elif mode == "generic_to_brand":
#             question = f"What is a brand name for {drug.generic_name}?"
#             answer = drug.brand_name.lower()
#             question_type = "generic_to_brand"

#         else:
#             if random.choice([True, False]):
#                 question = f"What is the generic name for {drug.brand_name}?"
#                 answer = drug.generic_name.lower()
#                 question_type = "brand_to_generic"
#             else:
#                 question = f"What is a brand name for {drug.generic_name}?"
#                 answer = drug.brand_name.lower()
#                 question_type = "generic_to_brand"

#         data = {
#             "question": question,
#             "answer": answer,
#             "question_type": question_type,
#         }

#         return Response(data)

