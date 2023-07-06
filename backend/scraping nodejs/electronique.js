const { Builder, By, Key, until } = require('selenium-webdriver');
const fs = require('fs');

async function initializeDriver() {
  let driver = await new Builder().forBrowser('firefox').build();
  return driver;
}

async function runScraping() {
  let driver = await initializeDriver();

  try {
    await driver.get('https://sn.coinafrique.com/categorie/electronique');

    let hasNextPage = true;
    let pageNumber = 1;
    let tab = [];

    while (hasNextPage && pageNumber <= 10) {
      console.log('Page', pageNumber);

      // Attendre que les annonces se chargent
      await driver.wait(until.elementLocated(By.className('col s6 m4 l3')), 100);

      // Récupérer tous les éléments d'annonce
      let adCards = await driver.findElements(By.className('col s6 m4 l3'));

      // Parcourir les annonces et extraire les informations souhaitées
      for (let adCard of adCards) {
        let image = await adCard.findElement(By.className('ad__card-img')).getAttribute('src');
        let title1 = await adCard.findElement(By.className('ad__card-description')).getText();
        let title2 = title1.replace(`\"`,'-');
        let title = title2.replace("''",'');
        let price = await adCard.findElement(By.className('ad__card-price')).getText();
        let location_on = await adCard.findElement(By.className('ad__card-location')).getText();
        let location = location_on.replace('location_on\n', '')

        tab.push({ title, price, location, image });
      }

      // Vérifier s'il y a une page suivante
      let nextPageButton = await driver.findElement(By.className('next'));
      hasNextPage = await nextPageButton.isEnabled();

      // Si une page suivante existe, cliquer dessus
      if (hasNextPage) {
        await driver.executeScript("arguments[0].click();", nextPageButton);

        // Attendre que la nouvelle page se charge
        await driver.wait(until.elementLocated(By.className('col s6 m4 l3')), 1000);
      }

      pageNumber++;
    }

    let jsonData = JSON.stringify(tab);

    fs.writeFile('coinafrique_electronique.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Une erreur s\'est produite lors de l\'écriture du fichier JSON :', err);
        return;
      }
      console.log('Les données ont été enregistrées dans le fichier JSON avec succès.');
    });
  } finally {
    await driver.quit();
  }
}

runScraping();