from django.contrib import admin
from .models import Drug, DrugClass, Brand


# --------------------
# Drug Admin
# --------------------
@admin.register(Drug)
class DrugAdmin(admin.ModelAdmin):
    list_display = ("generic_name", "get_brands", "get_classes", "is_verified", "is_top_200", "is_combination")
    search_fields = ("generic_name", "brands__name", "classes__name")
    list_filter = ("is_verified", "is_top_200", "classes")
    filter_horizontal = ("classes",)

    def get_brands(self, obj):
        return ", ".join([b.name for b in obj.brands.all()])
    get_brands.short_description = "Brands"
    
    def get_classes(self,obj):
        return ", ".join([c.name for c in obj.classes.all()])
    get_classes.short_description="Classes"


# --------------------
# Brand Admin
# --------------------
@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "get_generics", "get_classes")
    search_fields = ("name", "drugs__generic_name")
    list_filter = ("drugs__classes",)
    filter_horizontal = ("drugs",)

    def get_generics(self, obj):
        return ", ".join([d.generic_name for d in obj.drugs.all()])
    get_generics.short_description = "Generics"

    def get_classes(self, obj):
        classes = set()
        for drug in obj.drugs.all():
            for c in drug.classes.all():
                classes.add(c.name)
        return ", ".join(classes)
    get_classes.short_description = "Classes"


# --------------------
# DrugClass Admin
# --------------------
@admin.register(DrugClass)
class DrugClassAdmin(admin.ModelAdmin):
    list_display = ("name", "class_type")
    search_fields = ("name",)
    list_filter = ("class_type",)