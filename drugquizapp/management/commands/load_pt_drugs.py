import json
from pathlib import Path
from django.core.management.base import BaseCommand
from pthealthcare.models import PTHealthcareDrug, DrugFact

class Command(BaseCommand):
    help = "Load PT drugs from JSON file"

    def handle(self, *args, **kwargs):
        base_dir = Path(__file__).resolve().parents[3]
        data_file = base_dir / "drugquizapp" / "data" / "pt_drugs2.json"

        if not data_file.exists():
            self.stdout.write(self.style.ERROR(f"Missing file: {data_file}"))
            return

        with open(data_file) as f:
            drugs = json.load(f)

        drug_count = 0
        fact_count = 0

        for entry in drugs:
            drug, created = PTHealthcareDrug.objects.get_or_create(
                name=entry["name"],
                defaults={"drug_class": entry.get("drug_class", ""), "notes": ""}
            )
            if created:
                drug_count += 1

            for order, fact in enumerate(entry.get("facts", []), start=1):
                text, category = fact
                DrugFact.objects.get_or_create(
                    drug=drug,
                    text=text,
                    category=category,
                    order=order
                )
                fact_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Loaded PT Drugs: {drug_count}\nLoaded Facts: {fact_count}"
            )
        )