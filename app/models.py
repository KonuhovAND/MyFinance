from django.db import models
from django.utils import timezone

# Create your models here.
class Category_spend(models.Model):
    text = models.TextField(max_length=20)
    def __str__(self):
        return self.text
class Category_income(models.Model):
    text = models.TextField(max_length=20)
    def __str__(self):
        return self.text


    
class Spending(models.Model):
    text = models.TextField(max_length=20)
    amount = models.FloatField()
    category = models.ForeignKey(Category_spend,on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text +f' amount - {self.amount} catagory - {self.category}'

    
class Income(models.Model):
    text = models.TextField(max_length=20)
    amount = models.FloatField()
    category = models.ForeignKey(Category_income,on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text +f' amount - {self.amount} catagory - {self.category}'

        
