const fs = require('fs');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/firefox');

async function initializeDriver() {
  let options = new Options();
  options.headless(); // Exécution en mode headless (sans interface graphique)

  let driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
  return driver;
}

async function runScraping() {
  let driver = await initializeDriver();

  try {
    await driver.get('https://sn.coinafrique.com/categorie/electromenager');

    // Attendre que les annonces se chargent
    await driver.wait(until.elementLocated(By.className('row adcard__listing')), 5000);

    let pageNumber = 1;
    let data = []; // Tableau pour stocker les données des annonces

    while (true && pageNumber<30) {
      //console.log(`Page ${pageNumber}`);

      // Récupérer tous les éléments d'annonce
      let adCards = await driver.findElements(By.className('col s6 m4 l3'));

      // Parcourir les annonces et extraire les informations souhaitées
      for (let adCard of adCards) {
        let image = await adCard.findElement(By.className('ad__card-img')).getAttribute('src');
        let price = await adCard.findElement(By.className('ad__card-price')).getText();
        let des = await adCard.findElement(By.className('ad__card-description')).getText();
        let desc = des.replace(`\"`,'-');
        let description = desc.replace("''",'');
        let location_on = await adCard.findElement(By.className('ad__card-location')).getText();
        let location = location_on.replace('location_on\n', '')

        // Créer un objet avec les données de l'annonce
        let adData = {
          image: image,
          price: price,
          description: description,
          location: location
        };

        // Ajouter l'objet au tableau des données
        data.push(adData);

        console.log('Image :', image);
        console.log('Prix :', price);
        console.log('Description :', description);
        console.log('Location :', location);
        console.log('-----------------------------------');
      }

      // Vérifier s'il existe une page suivante
      let nextPageButton = await driver.findElement(By.className('next'));

      if (await nextPageButton.isEnabled()) {
        pageNumber++;
        await nextPageButton.click();
        // await driver.wait(until.stalenessOf(adCards[0]), 10000);
      } else {
        break; // Sortir de la boucle si aucune page suivante n'est disponible
      }
    }

    // Enregistrer les données dans un fichier JSON
    let jsonData = JSON.stringify(data, null, 2); // Formater les données avec 2 espaces d'indentation
    fs.writeFileSync('electromenager.json', jsonData);
    console.log('Données enregistrées dans electromenager.json');
  } finally {
    await driver.quit();
  }
}

runScraping();
