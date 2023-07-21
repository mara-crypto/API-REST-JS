document.addEventListener('DOMContentLoaded', () => {
  const modificationsList = document.getElementById('modifications-list');

  const getModifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token != null) {
        const decodedToken = parseJwt(token);
        const id_editeur = decodedToken.id_user;

        const response = await fetch(`http://localhost:3000/api/modifications/editeur/${id_editeur}`);
        const data = await response.json();

        data.forEach((modification, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${modification.title}</td>
            <td>${modification.price}</td>
            <td>${modification.location}</td>
            <td>${modification.image}</td>
            <td>${modification.id_bien}</td>
            <td>${modification.service}</td>
            <td>${modification.statut}</td>
            <td>${modification.type}</td>
            <td>
              <button type="button" class="btn btn-primary" onclick="editModification(${modification.id})">Modifier</button>
              <button type="button" class="btn btn-danger" onclick="deleteModification(${modification.id})">Supprimer</button>
            </td>
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
