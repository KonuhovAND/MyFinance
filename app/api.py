from tastypie import fields
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from tastypie.resources import ModelResource
from app.models import Category_income, Category_spend, Income, Spending
from datetime import date
from django.core.exceptions import ValidationError


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

        # No filters: return all spending records
        if not year_param and not month_param:
            return queryset

        # Require both values
        if not year_param or not month_param:
            raise ValidationError(
                "Both 'year' and 'month' are required."
            )

        try:
            year = int(year_param)
            month = int(month_param)

            if month < 1 or month > 12:
                raise ValueError

        except ValueError:
            raise ValidationError(
                "'year' must be a valid year and 'month' must be between 1 and 12."
            )

        start_date = date(year, month, 1)

        if month == 12:
            end_date = date(year + 1, 1, 1)
        else:
            end_date = date(year, month + 1, 1)

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

        # No filters: return all spending records
        if not year_param and not month_param:
            return queryset

        # Require both values
        if not year_param or not month_param:
            raise ValidationError(
                "Both 'year' and 'month' are required."
            )

        try:
            year = int(year_param)
            month = int(month_param)

            if month < 1 or month > 12:
                raise ValueError

        except ValueError:
            raise ValidationError(
                "'year' must be a valid year and 'month' must be between 1 and 12."
            )

        start_date = date(year, month, 1)

        if month == 12:
            end_date = date(year + 1, 1, 1)
        else:
            end_date = date(year, month + 1, 1)

        return queryset.filter(
            created_at__gte=start_date,
            created_at__lt=end_date,
        )


