from django.db import models


class PTHealthcareDrug(models.Model):
    name = models.CharField(max_length=255, unique=True)
      # KEEP OLD FOR SAFETY (temporary)
    drug_class = models.CharField(max_length=255, blank=True)

    # NEW RELATIONAL VERSION
    classes = models.ManyToManyField("DrugClass", blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return self.name


class DrugFact(models.Model):

    CATEGORY_CHOICES = [
        ("mechanism", "Mechanism"),
        ("indication", "Indication"),
        ("side_effect", "Side Effect"),
        ("contraindication", "Contraindication"),
        ("interaction", "Interaction"),
        ("other", "Other"),
    ]

    drug = models.ForeignKey(
        PTHealthcareDrug,
        related_name="facts",
        on_delete=models.CASCADE
    )

    text = models.CharField(max_length=255)

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default="other"
    )

    order = models.IntegerField(default=0)

    class Meta:
        ordering = ["order"]
    
    

    def __str__(self):
        return f"{self.drug.name} - {self.text[:40]}"
    

class DrugClass(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name