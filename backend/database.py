from backend.config import SUPABASE_USER, SUPABASE_PASSWORD, SUPABASE_HOST, SUPABASE_PORT, SUPABASE_NAME, FILE_PATH, TABLE_NAME
import psycopg2
import csv


def export_data_to_csv():
    try:
        conn = psycopg2.connect(
            host=SUPABASE_HOST,
            port=SUPABASE_PORT,
            user=SUPABASE_USER,
            password=SUPABASE_PASSWORD,
            database=SUPABASE_NAME
        )

        cur = conn.cursor()
        cur.execute(f"SELECT * FROM {TABLE_NAME}")
        results = cur.fetchall()

        with open(FILE_PATH, "w", newline="") as f:
            writer = csv.writer(f)

            # write the column names
            writer.writerow([col[0] for col in cur.description])

            # write the query results
            writer.writerows(results)

        cur.close()
        conn.close()
        return "Data from the database was correctly exported to the CSV file."

    except psycopg2.Error as e:
        return f"Error: {e}"
