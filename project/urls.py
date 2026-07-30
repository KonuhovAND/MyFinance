"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.urls import path,include
import app.api as api

category_spendAPI = api.Category_spendAPI()
spendingAPI = api.SpendingAPI()

category_incomeAPI = api.Category_incomeAPI()
incomeAPI = api.IncomeAPI()



urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('app.urls')),
    path('fake_api/',include(category_spendAPI.urls)),
    path('fake_api/',include(spendingAPI.urls)),
    path('fake_api/',include(category_incomeAPI.urls)),
    path('fake_api/',include(incomeAPI.urls)),
]
