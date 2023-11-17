import os
from dotenv import load_dotenv

load_dotenv()
EDENAI_API_KEY = os.getenv('EDENAI_API_KEY')

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

SUPABASE_USER = os.getenv('SUPABASE_USER')
SUPABASE_PASSWORD = os.getenv('SUPABASE_PASSWORD')
SUPABASE_HOST = os.getenv('SUPABASE_HOST')
SUPABASE_PORT = os.getenv('SUPABASE_PORT')
SUPABASE_NAME = os.getenv('SUPABASE_NAME')

FILE_PATH = "/Users/mac/Desktop/FlaskShelfLife/Shelf_life_of_products/backend/products_condition_vacuum.csv"
TABLE_NAME = "tasks"
