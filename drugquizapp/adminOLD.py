from django.contrib import admin
from .models import Drug, DrugClass, Brand

# Drug admin – show generic_name and related brands
@admin.register(Drug)
class DrugAdmin(admin.ModelAdmin):
    list_display = ("get_brands","generic_name", "is_verified", "is_top_200")
    search_fields = ("generic_name","brands_name", "classes")
    list_filter = ("is_verified", "is_top_200", "classes")

    def get_brands(self, obj):
        return ", ".join([b.name for b in obj.brands.all()])
    get_brands.short_description = "Brands"
    
    def get_classes(self,obj):
        return ", ".join([c.name for c in obj.classes.all()])
    get_classes.short_description="Classes"


# Brand admin – view individual brand entries
@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ("name", "drug", "get_classes")
    search_fields = ("name", "drug__generic_name")
    list_filter = ("drug__classes",)

    def get_classes(self, obj):
        return ", ".join([c.name for c in obj.drug.classes.all()])
    get_classes.short_description = "Classes"


# DrugClass admin – same as before
@admin.register(DrugClass)
class DrugClassAdmin(admin.ModelAdmin):
    list_display = ("name", "class_type")
    search_fields = ("name",)
    list_filter = ("class_type",)

# @admin.register(Drug)
# class DrugAdmin(admin.ModelAdmin):
#     list_display = ("brand_name", "generic_name", "is_verified")
#     search_fields = ("brand_name", "generic_name")


# @admin.register(DrugClass)
# class DrugClassAdmin(admin.ModelAdmin):
#     list_display = ("name", "source")
#     search_fields = ("name",)


# from django.contrib import admin
# from .models import DrugPair,GenericDrug, BrandDrug

# @admin.register(DrugPair)
# class DrugPairAdmin(admin.ModelAdmin):
#     list_display = ('brand_name', 'generic_name', 'generic_drug_class', 'is_verified', 'is_rejected')  # show these columns
#     list_filter = ('is_verified', 'is_rejected')  # filter sidebar
#     search_fields = ('brand_name', 'generic_name')  # add search bar
#     list_editable = ('is_verified', 'is_rejected')  # make them editable from the list view
    
#     # Custom method to show drug_class from GenericDrug
#     def generic_drug_class(self, obj):
#          # Grab the first BrandDrug's generic drug_class
#         brand_obj = BrandDrug.objects.filter(name=obj.brand_name).first()
#         return brand_obj.generic.drug_class if brand_obj else ''

#     generic_drug_class.short_description = 'Drug Class'