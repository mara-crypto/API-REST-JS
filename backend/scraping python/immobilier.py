from selenium import webdriver
from selenium.webdriver.common.by import By
import json

def run_scraping():
    driver = webdriver.Firefox()
  
    try:
        driver.get('https://www.senemarket.sn/category/immobilier')

        hasNextPage = True
        pageNumber = 1
        tab = []

        while hasNextPage and pageNumber <  100:
            print('Page', pageNumber)

            # Attendre que les annonces se chargent
            driver.implicitly_wait(5)

            # Récupérer tous les éléments d'annonce
            adCards = driver.find_elements(By.CLASS_NAME, 'item-list')

            # Parcourir les annonces et extraire les informations souhaitées
            for adCard in adCards:
                image = adCard.find_element(By.CSS_SELECTOR, '.lazyload.thumbnail.no-margin').get_attribute('src')
                title = adCard.find_element(By.CLASS_NAME, 'add-title').text
                price = adCard.find_element(By.CLASS_NAME, 'item-price').text
                location = adCard.find_element(By.CLASS_NAME,'item-location').find_element(By.CLASS_NAME, 'info-link').text

                tab.append({'title': title, 'price': price, 'location': location, 'image': image})
                #print({'title': title, 'price': price, 'location': location, 'image': image})

            # Vérifier s'il y a une page suivante
            nextPageButton = driver.find_element(By.CLASS_NAME, 'page-link')
            hasNextPage = nextPageButton.is_enabled()

            # Si une page suivante existe, cliquer dessus
            if hasNextPage:
                driver.execute_script("arguments[0].click();", nextPageButton)

                # Attendre que la nouvelle page se charge
                driver.implicitly_wait(5)

            pageNumber += 1

        jsonData = json.dumps(tab, ensure_ascii=False)

        with open('immobilier.json', 'w', encoding='utf-8') as file:
            file.write(jsonData)

        print('Les données ont été enregistrées dans le fichier JSON avec succès.')

    finally:
        driver.quit()

run_scraping()