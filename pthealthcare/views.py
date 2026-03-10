from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PTHealthcareDrug
from .serializers import PTHealthcareDrugSerializer


class PTHealthcareDrugViewSet(viewsets.ModelViewSet):
    queryset = PTHealthcareDrug.objects.all()
    serializer_class = PTHealthcareDrugSerializer


# NEW: return unique drug classes
@api_view(["GET"])
def drug_classes(request):
    classes = (
        PTHealthcareDrug.objects
        .exclude(drug_class__exact="")
        .values_list("drug_class", flat=True)
        .distinct()
        .order_by("drug_class")
    )

    return Response(classes)