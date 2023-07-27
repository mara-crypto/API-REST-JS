function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', () => {
  const modificationsList = document.getElementById('modifications-list');

  const getModifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token != null) {
        const decodedToken = parseJwt(token);
        const id_editeur = decodedToken.id_user;

        const response = await fetch(`http://localhost:3000/api/modification/editeur/${id_editeur}`);
        const data = await response.json();

        data.forEach((modification, index) => {
          const row = document.createElement('tr');
          row.setAttribute("class", "position-relative")
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${modification.id_bien}</td>
            <td>${modification.service}</td>
            <td>${modification.statut}</td>
            <td>${modification.type}</td>
            <td  class="d-flex justify-content-between" position-absolute bottom-0 start-0 w-100>
              <!-- Button trigger modal -->
              <a class="btn btn-sm btn-danger rounded py-2 px-4" data-bs-toggle="modal" data-bs-target="#confirm-delete-${modification.id}">Supprimer</a>
            </td>


            <!-- Confirm Delete Modal -->
            <div class="modal fade" id="confirm-delete-${modification.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmation de Suppression</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <p class="text-secondary">Voulez-vous vraiment supprimer le produit?</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                      <button type="button" class="btn btn-danger" onclick="deleteModification(${modification.id})" data-bs-dismiss="modal">Supprimer</button>
                    </div>
                </div>
                </div>
            </div>
          `;
          modificationsList.appendChild(row);
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des modifications :', error);
    }
  };

  getModifications();
});

// Vous pouvez ajouter les fonctions editModification() et deleteModification() pour gérer les actions de modification et suppression.


function deleteModification(id) {


  const options = {
    method: 'DELETE',
    headers: {accept: 'application/json', 'Content-Type': 'application/json'}
  };
  
  fetch(`http://localhost:3000/api/modification/${id}`, options)
    .then(response => response.json())
    .then(response => {
       console.log(response);
       window.location.reload("proposition.html");
      })
    .catch(err => console.error(err));  
}






document.addEventListener('DOMContentLoaded', () => {
  const suppressionList = document.getElementById('suppression-list');

  const getModifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token != null) {
        const decodedToken = parseJwt(token);
        const id_editeur = decodedToken.id_user;

        const response = await fetch(`http://localhost:3000/api/suppression/editeur/${id_editeur}`);
        const data = await response.json();

        data.forEach((modification, index) => {
          const row = document.createElement('tr');
          row.setAttribute("class", "position-relative")
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${modification.id_bien}</td>
            <td>${modification.service}</td>
            <td>${modification.statut}</td>
            <td>${modification.type}</td>
            <td  class="d-flex justify-content-between" position-absolute bottom-0 start-0 w-100>
              <!-- Button trigger modal -->
              <a class="btn btn-sm btn-danger rounded py-2 px-4" data-bs-toggle="modal" data-bs-target="#confirm-delete-${modification.id}">Supprimer</a>
            </td>


            <!-- Confirm Delete Modal -->
            <div class="modal fade" id="confirm-delete-${modification.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmation de Suppression</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <p class="text-secondary">Voulez-vous vraiment supprimer le produit?</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                      <button type="button" class="btn btn-danger" onclick="deleteSuppression(${modification.id})" data-bs-dismiss="modal">Supprimer</button>
                    </div>
                </div>
                </div>
            </div>
          `;
          suppressionList.appendChild(row);
        });
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des modifications :', error);
    }
  };

  getModifications();
});

// Vous pouvez ajouter les fonctions editModification() et deleteModification() pour gérer les actions de modification et suppression.


function deleteSuppression(id) {


  const options = {
    method: 'DELETE',
    headers: {accept: 'application/json', 'Content-Type': 'application/json'}
  };
  
  fetch(`http://localhost:3000/api/suppression/${id}`, options)
    .then(response => response.json())
    .then(response => {
       console.log(response);
       window.location.reload("proposition.html");
      })
    .catch(err => console.error(err));  
}






























































// function parseJwt (token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const modificationsList = document.getElementById('modifications-list');
//   const suppressionList = document.getElementById('suppression-list');

//   const getModifications = async (content, api) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (token != null) {
//         const decodedToken = parseJwt(token);
//         const id_editeur = decodedToken.id_user;

//         const response = await fetch(`${api}/${id_editeur}`);
//         const data = await response.json();

//         data.forEach((modification, index) => {
//           const row = document.createElement('tr');
//           row.setAttribute("class", "position-relative")
//           row.innerHTML = `
//             <th scope="row">${index + 1}</th>
//             <td>${modification.id_bien}</td>
//             <td>${modification.service}</td>
//             <td>${modification.statut}</td>
//             <td>${modification.type}</td>
//             <td  class="d-flex justify-content-between" position-absolute bottom-0 start-0 w-100>
//               <!-- Button trigger modal -->
//               <a class="btn btn-sm btn-danger rounded py-2 px-4" data-bs-toggle="modal" data-bs-target="#confirm-delete-${modification.id}">Supprimer</a>
//             </td>


//             <!-- Confirm Delete Modal -->
//             <div class="modal fade" id="confirm-delete-${modification.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//                 <div class="modal-dialog">
//                 <div class="modal-content">
//                     <div class="modal-header">
//                       <h1 class="modal-title fs-5" id="staticBackdropLabel">Confirmation de Suppression</h1>
//                       <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                     </div>
//                     <div class="modal-body">
//                       <p class="text-secondary">Voulez-vous vraiment supprimer le produit?</p>
//                     </div>
//                     <div class="modal-footer">
//                       <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
//                       <button type="button" class="btn btn-danger" onclick="deleteModification(${modification.id})" data-bs-dismiss="modal">Supprimer</button>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//           `;
//           content.appendChild(row);
//         });
//       }
//     } catch (error) {
//       console.error('Erreur lors de la récupération des modifications :', error);
//     }
//   };

//   getModifications(modificationsList, 'http://localhost:3000/api/modification');
//   getModifications();
// });

// // Vous pouvez ajouter les fonctions editModification() et deleteModification() pour gérer les actions de modification et suppression.


// function deleteModification(id) {


//   const options = {
//     method: 'DELETE',
//     headers: {accept: 'application/json', 'Content-Type': 'application/json'}
//   };
  
//   fetch(`http://localhost:3000/api/modification/${id}`, options)
//     .then(response => response.json())
//     .then(response => {
//        console.log(response);
//        window.location.reload("proposition.html");
//       })
//     .catch(err => console.error(err));  
// }

