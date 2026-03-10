# pthealthcare/admin.py
from django.contrib import admin
from .models import PTHealthcareDrug, DrugFact


class DrugFactInline(admin.TabularInline):
    model = DrugFact
    extra = 5


@admin.register(PTHealthcareDrug)
class PTHealthcareDrugAdmin(admin.ModelAdmin):
    inlines = [DrugFactInline]