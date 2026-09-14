import os
import sys
import django
from django.core.management import call_command

# Asegurar que la raíz del proyecto y backend estén en sys.path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
BACKEND_DIR = os.path.join(BASE_DIR, 'backend')
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Configurar Django para los servicios del backend
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

# Asegurar que las tablas SQLite existan para pruebas de modelos y servicios
try:
    call_command('migrate', verbosity=0)
except Exception:
    pass
