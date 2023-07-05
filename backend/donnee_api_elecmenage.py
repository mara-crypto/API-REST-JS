import json
import requests

url = "https://bestbuy-product-data.p.rapidapi.com/bestbuy/"

querystring = {"page": "1", "keyword": "home+appliances"}

headers = {
    "X-RapidAPI-Key": "cf3522248dmshddd03cb926c613ep1a6cc4jsn5148f71f007d",
    "X-RapidAPI-Host": "bestbuy-product-data.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

# Vérifiez si la requête a réussi (code de statut 200)
if response.status_code == 200:
    data = response.json()

    # Liste pour stocker les données d'électroménager
    data_elec = []

    # Parcourir les éléments de la liste "data" et extraire les informations souhaitées
    for item in data:
        image = item["image_url"]
        price = item["price"]
        title = item["title"]
        location = item["product_url"]
        

        # Créer un dictionnaire avec les données d'électroménager
        api_elecmenager = {
            "image": image,
            "price": price,
            "title": title,
            "location": location
        }

        # Ajouter le dictionnaire à la liste des données d'électroménager
        data_elec.append(api_elecmenager)

    # Enregistrer les données d'électroménager dans un fichier JSON
    with open("api_elecmenager.json", "w") as file:
        json.dump(data_elec, file, indent=2)
        print("Données d'électroménager enregistrées dans api_elecmenager.json")
else:
    print("Erreur lors de la requête : ", response.status_code)
