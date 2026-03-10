"""
URL configuration for drugquizbackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from loginout.views import RegisterView,ProfileView,LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



def home(request):
    return HttpResponse("Hello 👋 Drug quiz backend is running.")

urlpatterns = [
    path('', home),
    path('admin/', admin.site.urls),
    path('api/', include('drugquizapp.urls')),
    path('api/pthealthcare/', include('pthealthcare.urls')),
    path('api/auth/', include('loginout.urls')),
    path('api/token/',TokenObtainPairView.as_view(), name="token_obtain_pair"),#both these in the simplejwt docs
    path('api/token/refresh/', TokenRefreshView.as_view(), name="token_refresh")#both these in the simplejwt docs
]
