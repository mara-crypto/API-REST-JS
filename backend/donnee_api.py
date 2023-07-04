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

    # Enregistrer les données dans un fichier JSON
    with open("data.json", "w") as file:
        json.dump(data, file, indent=2)
        print("Données enregistrées dans data.json")
else:
    print("Erreur lors de la requête : ", response.status_code)
