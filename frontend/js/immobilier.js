document.addEventListener('DOMContentLoaded', () => {
  const propertyList = document.querySelector('#property-list');

  const getProperties = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/immobilier');
      const data = await response.json();

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
                <a type="button" class="btn btn-sm btn-primary rounded py-2 px-4" href="" data-bs-toggle="modal" data-bs-target="#${property.id}">Modifier</a>
                <a class="btn btn-sm btn-dark rounded py-2 px-4" data-bs-toggle="modal" data-bs-target="#confirm-delete-${property.id}">Supprimer</a>
              </div>
            </div>
          </div>
          <!-- Button trigger modal -->

          
          <!-- Modal -->
          <div class="modal fade" id="${property.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                  <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <form id="property-form-${property.id}">
                    <div class="mb-3">
                      <label for="title-${property.id}" class="form-label">Titre</label>
                      <input type="text" class="form-control" id="title-${property.id}" data-product-id="${property.id}" placeholder="Entrez le titre" value="${property.title}">
                    </div>
                    <div class="mb-3">
                      <label for="price-${property.id}" class="form-label">Prix</label>
                      <input type="text" class="form-control" id="price-${property.id}" data-product-id="${property.id}"placeholder="Entrez le prix" value="${property.price}">
                    </div>
                    <div class="mb-3">
                      <label for="location-${property.id}" class="form-label">Localisation</label>
                      <input type="text" class="form-control" id="location-${property.id}" data-product-id="${property.id}" placeholder="Entrez la localisation" value="${property.location}">
                    </div>
                    <div class="mb-3">
                      <label for="image-${property.id}" class="form-label">Image</label>
                      <input type="text" class="form-control" id="image-${property.id}" data-product-id="${property.id}" placeholder="Entrer l'url de l'image" value="${property.image}">
                    </div>
                  </form>
                  </div>
                  <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                  <button type="button" class="btn btn-primary" onclick="saveChanges(${property.id})" data-bs-dismiss="modal">Envoyer</button>
                  </div>
              </div>
              </div>
          </div>
            <!-- Confirm Delete Modal -->
            <div class="modal fade" id="confirm-delete-${property.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmation de Suppression</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <p>Voulez-vous vraiment supprimer le produit ?</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn btn-danger" onclick="supprimerProduit(${property.id})" data-bs-dismiss="modal">Supprimer</button>
                    </div>
                </div>
                </div>
            </div>
        `;
        propertyList.appendChild(propertyItem);
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des biens immobiliers :', error);
    }
  };

  getProperties();
});

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

function saveChanges(propertyId) {

  const propertyForm = document.querySelector(`#property-form-${propertyId}`);
  const title = propertyForm.querySelector(`#title-${propertyId}`).value;
  const price = propertyForm.querySelector(`#price-${propertyId}`).value;
  const location = propertyForm.querySelector(`#location-${propertyId}`).value;
  const image = propertyForm.querySelector(`#image-${propertyId}`).value;
  // const id_bien = button.getAttribute('data-product-id');
  const id_bien = propertyId;

  const token = localStorage.getItem("token");
  const decodedToken = parseJwt(token)

  const id_editeur = decodedToken.id_user
  const service = "immobilier";

  const formData = {
    title,
    price,
    location,
    image,
    id_editeur,
    id_bien,
    service
  };

  fetch('http://localhost:3000/api/modification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Modification enregistrer:', data);
      // Vous pouvez effectuer d'autres actions ici après avoir enregistré les modifications
    })
    .catch(error => {
      console.error('Erreur lors de la sauvegarde des modifications:', error);
    });
}



function supprimerProduit(propertyId) {
    const id_bien = propertyId;
    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token)
  
    const id_editeur = decodedToken.id_user
    const service = "immobilier";
  
    const data_ = {
      id_editeur,
      id_bien,
      service
    }; 
    fetch('http://localhost:3000/api/suppression', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data_)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Suppression  enregistrer:', data);
        // Vous pouvez effectuer d'autres actions ici après avoir enregistré les modifications
      })
      .catch(error => {
        console.error('Erreur lors de la sauvegarde de suppression:', error);
    });
  
  }
F