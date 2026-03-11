import json
from pathlib import Path

from django.core.management.base import BaseCommand

from drugquizapp.models import Drug, DrugClass, Brand


class Command(BaseCommand):
    help = "Load drugs from JSON batch files"

    def handle(self, *args, **kwargs):

        base_dir = Path(__file__).resolve().parents[3]
        data_dir = base_dir / "drugquizapp" / "data"

        files = [
            "batch1.json",
            "batch2.json",
            "batch3.json",
            "batch4.json",
        ]

        drug_count = 0
        class_count = 0
        brand_count = 0

        for file in files:

            path = data_dir / file

            if not path.exists():
                self.stdout.write(self.style.WARNING(f"Missing file: {file}"))
                continue

            with open(path) as f:
                drugs = json.load(f)

            for entry in drugs:

                drug, created = Drug.objects.get_or_create(
                    generic_name=entry["generic_name"],
                    defaults={
                        "is_combination": entry["is_combination"],
                        "is_top_200": entry["is_top_200"],
                        "is_verified": True,
                    },
                )

                if created:
                    drug_count += 1

                # attach classes
                for class_name in entry["classes"]:

                    drug_class, class_created = DrugClass.objects.get_or_create(
                        name=class_name
                    )

                    if class_created:
                        class_count += 1

                    drug.classes.add(drug_class)

                # attach brands
                for brand_name in entry["brands"]:

                    brand, brand_created = Brand.objects.get_or_create(
                        name=brand_name
                    )

                    if brand_created:
                        brand_count += 1

                    brand.drugs.add(drug)

        self.stdout.write(
            self.style.SUCCESS(
                f"""
Loaded Drugs: {drug_count}
Created Classes: {class_count}
Created Brands: {brand_count}
"""
            )
        )