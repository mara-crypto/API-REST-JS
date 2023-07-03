import json
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def initialize_driver():
    options = Options()
    options.headless = True  # Exécution en mode headless (sans interface graphique)
    
    driver = webdriver.Firefox(options=options)
    return driver

def run_scraping():
    driver = initialize_driver()

    try:
        driver.get('https://sn.coinafrique.com/categorie/electromenager')

        # Attendre que les annonces se chargent
        WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'row.adcard__listing')))

        page_number = 1
        data = []  # Liste pour stocker les données des annonces

        while True:
            print(f"Page {page_number}")

            # Récupérer tous les éléments d'annonce
            ad_cards = driver.find_elements(By.CLASS_NAME, 'col.s6.m4.l3')

            # Parcourir les annonces et extraire les informations souhaitées
            for ad_card in ad_cards:
                image = ad_card.find_element(By.CLASS_NAME, 'ad__card-img').get_attribute('src')
                price = ad_card.find_element(By.CLASS_NAME, 'ad__card-price').text
                description = ad_card.find_element(By.CLASS_NAME, 'ad__card-description').text
                location = ad_card.find_element(By.CLASS_NAME, 'ad__card-location').text

                # Créer un dictionnaire avec les données de l'annonce
                ad_data = {
                    'image': image,
                    'price': price,
                    'description': description,
                    'location': location
                }

                # Ajouter le dictionnaire à la liste des données
                data.append(ad_data)

                print('Image:', image)
                print('Prix:', price)
                print('Description:', description)
                print('Location:', location)
                print('-----------------------------------')

            # Vérifier s'il existe une page suivante
            next_page_button = driver.find_element(By.CLASS_NAME, 'next')

            if next_page_button.is_enabled():
                page_number += 1
                next_page_button.click()
                # WebDriverWait(driver, 10).until(EC.staleness_of(ad_cards[0]))
            else:
                break  # Sortir de la boucle si aucune page suivante n'est disponible

        # Enregistrer les données dans un fichier JSON
        with open('annonces.json', 'w') as file:
            json.dump(data, file, indent=2)
        print('Données enregistrées dans annonces.json')
    finally:
        driver.quit()

run_scraping()
