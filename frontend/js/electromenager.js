document.addEventListener('DOMContentLoaded', () => {
  const propertyList = document.querySelector('#property-list');

  const getProperties = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/electromenager/?=');
      const data = await response.json();
      console.log(data);

      data.forEach(property => {
        const propertyItem = document.createElement('div');
        propertyItem.className = 'col-lg-4 col-md-6 wow fadeInUp';
        propertyItem.setAttribute('data-wow-delay', '0.1s');
        propertyItem.innerHTML = `
          <div class="room-item shadow rounded overflow-hidden">
            <div class="position-relative">
              <img class="img-fluid" src="${property.image}" alt="">
              <small class="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">${property.price}</small>
            </div>
            <div class="p-4 mt-2">
              <div class="d-flex justify-content-between mb-3">
                <h5 class="mb-0">${property.title}</h5>
              </div>
              <p class="text-body mb-3"><i class="bi bi-geo-alt-fill"></i> ${property.location}</p>
              <div class="d-flex justify-content-between">
                <button class="btn btn-sm btn-primary rounded py-2 px-4 modifier-btn">Modifier</button>
                <button class="btn btn-sm btn-dark rounded py-2 px-4 supprimer-btn">Supprimer</button>
              </div>
            </div>
          </div>
        `;
        propertyList.appendChild(propertyItem);

        // Récupérer les boutons "Modifier" et "Supprimer" par leur classe
        const modifierButton = propertyItem.querySelector('.modifier-btn');
        const supprimerButton = propertyItem.querySelector('.supprimer-btn');

        // Ajouter des écouteurs d'événements de clic aux boutons
        modifierButton.addEventListener('click', () => {
          // Afficher le formulaire de modification
          afficherFormulaireModification(property);
        });

        supprimerButton.addEventListener('click', () => {
          // Afficher le formulaire de suppression
          afficherFormulaireSuppression(property);
        });
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des propriétés :', error);
    }
  };

  const afficherFormulaireModification = (property) => {
    const popup = createPopup();
    const formulaireModification = createForm(`
      <h3>Modifier la propriété</h3>
      <label for="titre">Titre :</label>
      <div>
        <span>${property.title}</span>
        <input type="text" id="titre" value="">
      </div>
      <label for="image">Image :</label>
      <div>
        <span>${property.image}</span>
        <input type="text" id="image" value="">
      </div>
      <label for="prix">Prix :</label>
      <div>
        <span>${property.price}</span>
        <input type="text" id="prix" value="">
      </div>
      <label for="emplacement">Emplacement :</label>
      <div>
        <span>${property.location}</span>
        <input type="text" id="emplacement" value="">
      </div>
      <button id="enregistrerModification">Enregistrer</button>
    `);
  
    popup.appendChild(formulaireModification);
  
    // Gérer le clic sur le bouton "Enregistrer"
    const enregistrerModificationButton = formulaireModification.querySelector('#enregistrerModification');
    enregistrerModificationButton.addEventListener('click', () => {
      // Récupérer les valeurs modifiées du formulaire
      const titre = formulaireModification.querySelector('#titre').value;
      const image = formulaireModification.querySelector('#image').value;
      const prix = formulaireModification.querySelector('#prix').value;
      const emplacement = formulaireModification.querySelector('#emplacement').value;
  
      // Effectuer des actions de mise à jour en fonction des valeurs modifiées (par exemple, envoyer une requête au serveur)
  
      // Cacher la popup modale après la soumission
      popup.style.display = 'none';
    });
  };
  

  const afficherFormulaireSuppression = (property) => {
    const popup = createPopup();
    const formulaireSuppression = createForm(`
      <h3>Supprimer le produit</h3>
      <p>Êtes-vous sûr de vouloir supprimer cet produit ?</p>
      <button id="confirmerSuppression">Confirmer</button>
    `);

    popup.appendChild(formulaireSuppression);
    

    // Gérer le clic sur le bouton "Confirmer"
    const confirmerSuppressionButton = formulaireSuppression.querySelector('#confirmerSuppression');
    confirmerSuppressionButton.addEventListener('click', () => {
      // Effectuer des actions de suppression en fonction de l'ID de la propriété (par exemple, envoyer une requête au serveur)

      // Supprimer l'élément de propriété de la liste après la suppression
      const propertyItem = propertyList.querySelector(`#modifier-${property.id}`).closest('.room-item');
      propertyList.removeChild(propertyItem);

      // Cacher la popup modale après la suppression
      popup.style.display = 'none';
    });
  };


  const createPopup = () => {
    const popup = document.createElement('div');
    popup.style.display = 'flex';
    popup.style.position = 'fixed';
    popup.style.zIndex = '1';
    popup.style.left = '0';
    popup.style.top = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    document.body.appendChild(popup);

    const popupContent = document.createElement('div');
    popupContent.style.backgroundColor = 'white';
    popupContent.style.padding = '20px';
    popupContent.style.border = '1px solid #888';
    popupContent.style.width = '80%';
    popupContent.style.maxWidth = '600px';
    popup.appendChild(popupContent);

    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.color = '#aaa';
    closeBtn.style.float = 'right';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    popupContent.appendChild(closeBtn);

    closeBtn.addEventListener('click', () => {
      popup.style.display = 'none';
    });

    return popupContent;
  };

  const createForm = (content) => {
    const form = document.createElement('div');
    form.innerHTML = content;
    return form;
  };

  // Appel de la fonction pour récupérer les propriétés
  getProperties();
});

