import requests
import json
import random


url = "https://immobilier-leboncoin.p.rapidapi.com/api/v1/annonces"

querystring = {"departement":"75"}

headers = {
	"X-RapidAPI-Key": "cf3522248dmshddd03cb926c613ep1a6cc4jsn5148f71f007d",
	"X-RapidAPI-Host": "immobilier-leboncoin.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

# Vérifiez si la requête a réussi (code de statut 200)
if response.status_code == 200:
    data = response.json()

    # Liste pour stocker les données d'électroménager
    data_immo = []

    # Parcourir les éléments de la liste "data" et extraire les informations souhaitées
    for item in data:
        image = item["url"]
        price = random.choice("123000000F Cfa","12000000F Cfa","100000000F Cfa","11000000F Cfa","150000000F Cfa","25000000F Cfa","50000000F Cfa")
        title = item["category"]
        location = item["city"]
        

        # Créer un dictionnaire avec les données d'électroménager
        api_immobilier = {
            "image": image,
            "price": price,
            "title": title,
            "location": location
        }

        # Ajouter le dictionnaire à la liste des données d'électroménager
        data_immo.append(api_immobilier)

    # Enregistrer les données d'électroménager dans un fichier JSON
    with open("api_immobilier.json", "w") as file:
        json.dump(data_immo, file, indent=2)
        print("Données d'électroménager enregistrées dans api_immobilier.json")
else:
    print("Erreur lors de la requête : ", response.status_code)
