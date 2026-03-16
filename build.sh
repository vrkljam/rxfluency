#!/usr/bin/env bash

pip install -r requirements.txt

# build react
npm install --prefix frontend
npm run build --prefix frontend

# collect static files
python manage.py collectstatic --noinput

# migrate database
python manage.py migrate

python manage.py shell < create_superuser.py