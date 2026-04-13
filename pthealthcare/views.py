from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PTHealthcareDrug, DrugClass
from .serializers import PTHealthcareDrugSerializer, DrugClassSerializer


class PTHealthcareDrugViewSet(viewsets.ModelViewSet):
    queryset = PTHealthcareDrug.objects.all()
    serializer_class = PTHealthcareDrugSerializer



@api_view(["GET"])
def drug_classes(request):
    classes = DrugClass.objects.all().order_by("name")
    serializer = DrugClassSerializer(classes, many=True)
    return Response(serializer.data)


# @api_view(["GET"])
# def drug_classes(request):
#     classes = DrugClass.objects.all().values("id", "name")
#     return Response(classes)

# NEW: return unique drug classes
# @api_view(["GET"])
# def drug_classes(request):
#     classes = (
#         PTHealthcareDrug.objects
#         .exclude(drug_class__exact="")
#         .values_list("drug_class", flat=True)
#         .distinct()
#         .order_by("drug_class")
#     )

#     return Response(classes)


class DrugClassViewSet(viewsets.ModelViewSet):
    queryset = DrugClass.objects.all()
    serializer_class = DrugClassSerializer