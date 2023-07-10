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
        driver.get('https://www.expat-dakar.com/autre-electromenager')

        # Attendre que les annonces se chargent
        # WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, 'listings-cards__list')))

        page_number = 1
        data = []  # Liste pour stocker les données des annonces

        while page_number <= 10:  # Limiter le nombre de pages à 10
            print(f"Page {page_number}")

            # Récupérer tous les éléments d'annonce
            ad_cards = driver.find_elements(By.CLASS_NAME, 'listings-cards__list-item')

            # Parcourir les annonces et extraire les informations souhaitées
            for ad_card in ad_cards:
                # Vérifier si l'élément est la classe "listings-cards__list-item--push-notification"
                if "listings-cards__list-item--push-notification" in ad_card.get_attribute("class"):
                    continue  # Passer à l'élément suivant
                    
                # Extraire les informations de l'annonce
                image = ad_card.find_element(By.XPATH, '/html/body/div[1]/div/div/div/div[1]/div/div[1]/div[2]/div/div[1]/div/a/div[1]/div/div/div/img').get_attribute('src')
                price = ad_card.find_element(By.CLASS_NAME, 'listing-card__price').text
                description = ad_card.find_element(By.CLASS_NAME, 'listing-card__header__title').text
                location = ad_card.find_element(By.CLASS_NAME, 'listing-card__header__location').text
                
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
            
            # Attendre que le bouton pour passer à la page suivante soit présent
            # next_page_button = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'btn btn-primary pagination-view-more__button')))


            # Vérifier s'il existe une page suivante
            next_page_button = driver.find_element(By.XPATH, '/html/body/div[1]/div/div/div/div[1]/div/div[1]/div[4]/div[2]/a')

            if next_page_button.is_enabled():
                page_number += 1
                driver.execute_script('arguments[0].click;',next_page_button)
                # WebDriverWait(driver, 10).until(EC.staleness_of(ad_cards[0]))
            else:
                break  # Sortir de la boucle si aucune page suivante n'est disponible

        # Enregistrer les données dans un fichier JSON
        with open('electromenagerpy.json', 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2)
        print('Données enregistrées dans electromenagerpy.json')
    finally:
        driver.quit()

run_scraping()
