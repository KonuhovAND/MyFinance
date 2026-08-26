from django.http import JsonResponse
from app.models import Category_income,Category_spend,Income,Spending
from django.utils import timezone
from datetime import timedelta
# Create your views here.

def fetch_categories(request):
    spend = list(Category_spend.objects.values())
    income = list(Category_income.objects.values())
    return JsonResponse({"category_spend":spend,"category_income":income},json_dumps_params={'ensure_ascii': False})

def fetch_income(request):
    month_ago = timezone.now() - timedelta(days=30)
    income = list(Income.objects.filter(created_at__gte=month_ago).values())
    return JsonResponse({"data":income})

def fetch_spending(request):
    month_ago = timezone.now() - timedelta(days=30)
    spending = list(Spending.objects.filter(created_at__gte=month_ago).values())
    return JsonResponse({"data":spending})

def receive_data(request):
    pass
def receive_categories(request):
    pass
