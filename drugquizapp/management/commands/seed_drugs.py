import json
import os

from django.core.management.base import BaseCommand
from django.conf import settings
from drugquizapp.models import Drug, Brand, DrugClass


class Command(BaseCommand):
    help = "Seed database with drug dataset from JSON file"

    def handle(self, *args, **kwargs):

        file_path = os.path.join(
            settings.BASE_DIR,
            "batch4.json"   # 👈 since it's in root
        )

        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f"File not found: {file_path}"))
            return

        with open(file_path, "r") as f:
            drug_data = json.load(f)

        for entry in drug_data:

            drug, created = Drug.objects.get_or_create(
                generic_name=entry["generic_name"],
                defaults={
                    "is_top_200": entry["is_top_200"],
                    "is_combination": entry["is_combination"],
                    "is_verified": True,
                },
            )

            # Update flags even if drug existed
            drug.is_top_200 = entry["is_top_200"]
            drug.is_combination = entry["is_combination"]
            drug.save()

            # Brands
            for brand_name in entry["brands"]:
                brand, _ = Brand.objects.get_or_create(name=brand_name)
                drug.brands.add(brand)

            # Classes
            for class_name in entry["classes"]:
                drug_class, _ = DrugClass.objects.get_or_create(
                    name=class_name,
                    defaults={"class_type": "Therapeutic"},
                )
                drug.classes.add(drug_class)

        self.stdout.write(self.style.SUCCESS("Batch 4 seeded successfully"))