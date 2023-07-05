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

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    mail TEXT,
    password TEXT
);

CREATE TABLE editeur (
    id SERIAL PRIMARY KEY,
    full_name TEXT,
    mail TEXT,
    password TEXT
);


"""
filename = "CREATION_INSERTION.sql"
json_senemarket_electronique = "json/senemarket_electronique.json"
json_coinafrique_electronique = "json/coinafrique_electronique.json"
api_electronique = "json/api_electronique.json"
json_electromenager = "json/electromenager.json"
json_immobilier = "json/immobilier.json"

with open(filename, "w") as file:
    file.write(sql_query)

    file.write("\n\n\n-- Insertion des donnees du fichier senemarket_electronique.json dans la table electronique \n")
    with open(json_senemarket_electronique, "r") as json_file:
        json_data = json.load(json_file)
        query_data = "INSERT INTO electronique (title, price, location, image) VALUES\n"
        for index, elt in enumerate(json_data, start=1):
            values = """({0}, "{1}", "{2}", "{3}", "{4}")""".format(index, elt["title"], elt["price"], elt["location"], elt["image"])
            if index != len(json_data):
                values += ","
            query_data += values + "\n"
        
        file.write(query_data)


    file.write("\n\n\n-- Insertion des donnees du fichier coinafrique_electronique.json dans la table electronique \n")
    with open(json_coinafrique_electronique, "r") as json_file:
        electronique = json.load(json_file)
        query_electronique = "INSERT INTO electronique (title, price, location, image) VALUES\n"
        for index, elt in enumerate(electronique, start=1):
            values = """("{0}", "{1}", "{2}", "{3}")""".format(elt["title"], elt["price"], elt["location"], elt["image"])
            if index != len(electronique):
                values += ","
            query_electronique += values + "\n"
        
        file.write(query_electronique)


    file.write("\n\n\n-- Insertion des donnees du fichier coinafrique_electronique.json dans la table electronique \n")
    with open(api_electronique, "r") as json_file:
        api_electronique = json.load(json_file)
        query_api_electronique = "INSERT INTO electronique (title, price, image) VALUES\n"
        for index, elt in enumerate(api_electronique, start=1):
            values = """("{0}", "{1}", "{2}")""".format(elt["title"], elt["price"], elt["image"])
            if index != len(api_electronique):
                values += ","
            query_api_electronique += values + "\n"
        
        file.write(query_api_electronique)


    file.write("\n\n\n-- Insertion des donnees du fichier immobilier.json dans la table immobilier \n")
    with open(json_immobilier, "r") as json_file:
        immonilier = json.load(json_file)
        query_immoboilier = "INSERT INTO immobilier (title, price, location, image) VALUES\n"
        for index, elt in enumerate(immonilier, start=1):
            values = """({0}, "{1}", "{2}", "{3}", "{4}")""".format(index, elt["title"], elt["price"], elt["location"], elt["image"])
            if index != len(immonilier):
                values += ","
            query_immoboilier += values + "\n"
        
        file.write(query_immoboilier)


    file.write("\n\n\n-- Insertion des donnees du fichier immobilier.json dans la table immobilier \n")
    with open(json_electromenager, "r") as json_file:
        electromenager = json.load(json_file)
        query_electromenager = "INSERT INTO electromenager (title, price, location, image) VALUES\n"
        for index, elt in enumerate(electromenager, start=1):
            values = """({0}, "{1}", "{2}", "{3}", "{4}")""".format(index, elt["description"], elt["price"], elt["location"], elt["image"])
            if index != len(electromenager):
                values += ","
            query_electromenager += values + "\n"
        
        file.write(query_electromenager)


print("Le fichier SQL a été créé avec succès.")
