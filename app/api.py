from tastypie import fields
from tastypie.authorization import Authorization
from tastypie.authentication import Authentication
from tastypie.resources import ModelResource
from app.models import Category_income, Category_spend, Income, Spending


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
