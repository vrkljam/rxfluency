# pthealthcare/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PTHealthcareDrugViewSet , drug_classes

router = DefaultRouter()
router.register(r'drugs', PTHealthcareDrugViewSet, basename='pthealthcare')

urlpatterns = [
    path('', include(router.urls)),
    path("drug-classes/", drug_classes),
]
