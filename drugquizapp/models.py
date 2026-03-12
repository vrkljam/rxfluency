from django.db import models

# Create your models here.
class DrugClass(models.Model):
    CLASS_TYPE_CHOICES = [
        ("THERAPEUTIC", "Therapeutic"),
        ("MECHANISM","Mechanism"),
        ("CHEMICAL", "Chemical"),
        ("STEM", "Stem"),
        ("CUSTOM", "Custom"),
    ]

    name = models.CharField(max_length=200, unique=True)
    class_type = models.CharField(max_length=20, choices=CLASS_TYPE_CHOICES, default="CUSTOM")
    description = models.TextField(blank=True, null=True)  # optional explanation for students

    def __str__(self):
        return f"{self.name} ({self.class_type})"

class Drug(models.Model):
    generic_name = models.CharField(max_length=200, unique=True)
    classes = models.ManyToManyField(DrugClass, related_name="drugs")
    is_top_200 = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)  # optional notes
    is_verified = models.BooleanField(default=False)  # mark for curation/QA
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_combination = models.BooleanField(default=False)


    def __str__(self):
        return self.generic_name

class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)
    drugs = models.ManyToManyField(Drug, related_name="brands")
    
    # drug = models.ForeignKey(Drug, on_delete=models.CASCADE, related_name="brands")
    
    def __str__(self):
        return self.name

