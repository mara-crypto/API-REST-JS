import json
sql_query = """
CREATE TABLE electronique (
    id SERIAL PRIMARY KEY,
    title TEXT,
    price TEXT,
    location TEXT,
    image TEXT
);

CREATE TABLE electromenager (
    id SERIAL PRIMARY KEY,
    title TEXT,
    price TEXT,
    location TEXT,
    image TEXT
);

CREATE TABLE immobilier (
    id SERIAL PRIMARY KEY,
    title TEXT,
    price TEXT,
    location TEXT,
    image TEXT
);

"""

filename = "CREATION_INSERTION.sql"
json_filename = "scraping python/senemarket_electronique.json"

with open(filename, "w") as file:
    file.write(sql_query)

    with open(json_filename, "r") as json_file:
        json_data = json.load(json_file)
        query_data = "INSERT INTO electronique (title, price, location, image) VALUES\n"
        for index, elt in enumerate(json_data, start=1):
            values = """({0}, "{1}", "{2}", "{3}", "{4}")""".format(index, elt["title"], elt["price"], elt["location"], elt["image"])
            if index != len(json_data):
                values += ","
            query_data += values + "\n"
        
        file.write(query_data)

print("Le fichier SQL a été créé avec succès.")
