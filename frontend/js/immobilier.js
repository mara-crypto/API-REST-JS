document.addEventListener('DOMContentLoaded', () => {
    const propertyList = document.querySelector('#property-list');
  
    const getProperties = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/immobilier/?=');
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
                  <a class="btn btn-sm btn-primary rounded py-2 px-4" href="">Modifier</a>
                  <a class="btn btn-sm btn-dark rounded py-2 px-4" href="">Supprimer</a>
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
  