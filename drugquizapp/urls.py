from django.urls import path, include
from .views import DrugViewSet, RandomQuestion, DrugClassViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'drugs', DrugViewSet, basename='drug')
router.register(r"drugclasses", DrugClassViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("question/", RandomQuestion.as_view(), name='random-question'),
]


# from django.urls import path, include
# from .views2 import DrugPairViewSet, RandomQuestion
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register(r'drugs', DrugPairViewSet)


# urlpatterns = [
#     path("", include(router.urls)),
#     path("question/", RandomQuestion.as_view(), name='random-question')
# ]

    # path("question/", RandomQuestion.as_view(), name='random-question'),
    # path('drugs/', DrugList.as_view(), name='drug-list')