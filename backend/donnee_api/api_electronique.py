import json

# import requests
# url = "https://temu-com-shopping-api-realtime-api-scrapper-from-temu-com.p.rapidapi.com/search"

# querystring = {"keyword":"phone, tablet, computer, laptop, desktop, charger, iphone"}

# headers = {
# 	"X-RapidAPI-Key": "a9b31ea98bmsh5d78e2d0e5b8c15p11111ajsna3c5795ca4cb",
# 	"X-RapidAPI-Host": "temu-com-shopping-api-realtime-api-scrapper-from-temu-com.p.rapidapi.com"
# }

# response = requests.get(url, headers=headers, params=querystring)

# print(response.json())


json_file = "do.json"

# Taux de conversion de dollar à franc CFA
taux_conversion = 570

# Charger les données JSON à partir du fichier
with open(json_file, "r") as file:
    json_data = json.load(file)
    product_data = json_data["data"]["goodsList"]

    # Tableau pour stocker les informations des produits
    products = []

    # Parcourir les données des produits
    for product in product_data:
        title = product["data"]["title"]
        price = int(float(product["data"]["priceInfo"]["priceSchema"]) * taux_conversion)
        if price < 10000:
            price = "{:,}".format(price)
        else:
            price = "{:,.0f}".format(price)
        price = price.replace(",", " ")
        image = product["data"]["image"]["url"]

        # Ajouter les informations du produit au tableau
        products.append({"title": title, "price": price + "CFA", "image": image})

    # Enregistrer les informations des produits dans un fichier JSON
    output_file = "api_electronique.json"
    with open(output_file, "w") as outfile:
        json.dump(products, outfile, ensure_ascii=False, indent=4)

    print("Les données des produits ont été enregistrées dans le fichier", output_file)















