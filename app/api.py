from tastypie import fields
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from tastypie.resources import ModelResource
from app.models import Category_income, Category_spend, Income, Spending
from app.libs import check_year_month, end_start_dates


class Category_spendAPI(ModelResource):
    class Meta:
        queryset = Category_spend.objects.all()
        resource_name = "category_spend"
        allowed_methods = ["post", "get", "delete", "patch"]
        authentication = Authentication()
        authorization = Authorization()
        limit = 100
        max_limit = 500


class SpendingAPI(ModelResource):
    category = fields.ForeignKey(Category_spendAPI, "category")

    class Meta:
        queryset = Spending.objects.all().order_by("-created_at")
        resource_name = "spending"
        fields = ["id", "text", "amount", "category", "created_at"]
        allowed_methods = ["post", "get", "delete", "patch"]
        authentication = Authentication()
        authorization = Authorization()
        limit = 100
        max_limit = 500

    def get_object_list(self, request):
        queryset = super().get_object_list(request)

        year_param = request.GET.get("year")
        month_param = request.GET.get("month")

        year, month = check_year_month(queryset, year_param, month_param)
        start_date, end_date = end_start_dates(year, month)

        return queryset.filter(
            created_at__gte=start_date,
            created_at__lt=end_date,
        )


class Category_incomeAPI(ModelResource):
    class Meta:
        queryset = Category_income.objects.all()
        resource_name = "category_income"
        allowed_methods = ["post", "get", "delete", "patch"]
        authentication = Authentication()
        authorization = Authorization()
        limit = 100
        max_limit = 500


class IncomeAPI(ModelResource):
    category = fields.ForeignKey(Category_incomeAPI, "category")

    class Meta:
        queryset = Income.objects.all().order_by("-created_at")
        resource_name = "income"
        fields = ["id", "text", "amount", "category", "created_at"]
        allowed_methods = ["post", "get", "delete", "patch"]
        authentication = Authentication()
        authorization = Authorization()
        limit = 100
        max_limit = 500

    def get_object_list(self, request):
        queryset = super().get_object_list(request)

        year_param = request.GET.get("year")
        month_param = request.GET.get("month")
        year, month = check_year_month(queryset, year_param, month_param)
        start_date, end_date = end_start_dates(year, month)
        return queryset.filter(
            created_at__gte=start_date,
            created_at__lt=end_date,
        )
