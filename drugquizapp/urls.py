from django.urls import path, include
from .views import DrugViewSet, RandomQuestion, DrugClassViewSet, BrandViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'drugs', DrugViewSet, basename='drug')
router.register(r"drugclasses", DrugClassViewSet)
router.register(r"brands", BrandViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("question/", RandomQuestion.as_view(), name='random-question'),
]
