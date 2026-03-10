import requests
from django.core.management.base import BaseCommand
from django.conf import settings
from drugquizapp.models import GenericDrug, BrandDrug, DrugPair

class Command(BaseCommand):
    help = 'Import drugs from openFDA NDC endpoint'

    def handle(self, *args, **options):
        base_url = "https://api.fda.gov/drug/ndc.json"
        max_records = 200  # total entries to import in this run
        limit = 100        # per request
        skip = 0
        total_imported = 0

        api_key = settings.OPENFDA_API_KEY
        seen_pairs = set()

        # List of known bad/unwanted strings to skip
        BAD_ENTRIES = ["unknown", "not applicable", "na", "experimental", "test"]


        while True:
            if total_imported >= max_records:
                break

            params = {
                'api_key': api_key,
                'limit': limit,
                'skip': skip,
            }

            response = requests.get(base_url, params=params)
            if response.status_code != 200:
                self.stdout.write(self.style.ERROR(f"Error: {response.status_code}"))
                break

            data = response.json()
            results = data.get('results', [])
            if not results:
                break

            for item in results:
                if total_imported >= max_records:
                    break

                brand = item.get('brand_name', '').strip()
                generic_str = item.get('generic_name', '').strip()

                if not brand or not generic_str:
                    continue

                # Split generics if comma-separated
                generics = [g.strip() for g in generic_str.split(',') if g.strip()]
                
                # pull drug class if available--this was removed from file by chat
                # drug_classes = item.get('pharm_class_epc', [])
                # drug_class = ', '.join(drug_classes) if drug_classes else ''

                for gen_name in generics:
                    gen_name = gen_name.title()

                    if total_imported >= max_records:
                        break

                    # Skip if brand and generic are the same
                    if brand.lower() == gen_name.lower():
                        continue

                    # Skip if brand or generic is in BAD_ENTRIES
                    if any(x.lower() in BAD_ENTRIES for x in [brand, gen_name]):
                        continue

                    # Skip if already rejected in DB
                    if DrugPair.objects.filter(
                        brand_name=brand,
                        generic_name=gen_name,
                        is_rejected=True
                    ).exists():
                        continue

                    # Skip if we already added in this run
                    if (brand, gen_name) in seen_pairs:
                        continue
                    seen_pairs.add((brand, gen_name))
                    
                    # Get drug class from OpenFDA (pharm_class_epc as example)
                    drug_class_list = item.get('openfda', {}).get('pharm_class_epc', [])
                    drug_class_str = ', '.join(drug_class_list) if drug_class_list else ''

                    # 1. Get or create GenericDrug
                    generic_obj, _ = GenericDrug.objects.get_or_create(
                        name=gen_name,
                        defaults={'is_verified': False, 'drug_class':drug_class_str}
                    )
                    # if not created and not generic_obj.drug_class and drug_class:
                    #     generic_obj.drug_class = drug_class
                    #     generic_obj.save()

                    # 2. Get or create BrandDrug
                    BrandDrug.objects.get_or_create(
                        name=brand,
                        generic=generic_obj
                    )

                    # 3. Get or create DrugPair
                    DrugPair.objects.get_or_create(
                        brand_name=brand,
                        generic_name=gen_name,
                        defaults={'is_verified': False, 'is_rejected': True}
                    )

                    total_imported += 1
                    if total_imported % 500 == 0:
                        self.stdout.write(f"Imported {total_imported} pairs...")

            skip += limit
            self.stdout.write(f"Processed up to skip={skip}")

        self.stdout.write(self.style.SUCCESS(
            f"Finished. Imported {total_imported} unique brand-generic pairs."
        ))