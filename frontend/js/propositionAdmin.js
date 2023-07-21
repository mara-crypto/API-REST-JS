// // Fonction pour récupérer toutes les propositions depuis votre API
// async function getPropositions() {
//     try {
//       const response = await fetch('http://localhost:3000/api/proposition/');
//       const data = await response.json();
//       console.log(data);
  
//       // Parcourir les propositions et remplir les valeurs dans les div correspondants
//       data.forEach((proposition) => {
//         console.log(proposition);
//         document.getElementById('id_proposition').textContent = `Propositon N°: ${proposition.id}`;
//         document.getElementById('type_proposition').textContent = `Type Propositon: ${proposition.type}`;
//         document.getElementById('statut_proposition').textContent = `Statut Propositon: ${proposition.statut}`;
//         document.getElementById('service_proposition').textContent = `Service Propositon: ${proposition.service}`;
  
//         let idProduitText = '';
  
//         if (proposition.id_electronique != null) {
//           idProduitText = `N° Produit: ${proposition.id_electronique}`;
//         } else if ( proposition.id_electromenager != null) {
//           idProduitText = `N° Produit: ${proposition.id_electromenager}`;
//         } else if ( proposition.id_immobilier != null) {
//           idProduitText = `N° Produit: ${proposition.id_immobilier}`;
//         }
  
//         document.getElementById('id_produit').textContent = idProduitText;
//         document.getElementById('id_utilisateur').textContent = `N° Utilisateur: ${proposition.id_utilisateur}`;
//       });
//     } catch (error) {
//       console.error('Une erreur est survenue lors de la récupération des propositions :', error);
//     }
//   }
  
//   // Appeler la fonction pour récupérer et remplir les valeurs des propositions
//   getPropositions();
  


// Fonction pour récupérer toutes les propositions depuis votre API
async function getPropositions() {
    try {
      const response = await fetch('http://localhost:3000/api/proposition/');
      const data = await response.json();
      console.log(data);
  
      // Récupérer l'élément HTML où afficher les propositions
      const propositionsContainer = document.querySelector('.col-sm-6.mb-3.mb-sm-0');
  
      // Parcourir les propositions et créer les éléments de proposition dans le HTML
      data.forEach((proposition) => {
        // Créer un élément de proposition
        const propositionElement = document.createElement('div');
        propositionElement.classList.add('card');
        const propositionBodyElement = document.createElement('div');
        propositionBodyElement.classList.add('card-body');
  
        // Remplir les informations de la proposition dans les éléments de proposition
        const idPropositionElement = document.createElement('p');
        idPropositionElement.textContent = `Propositon N°: ${proposition.id}`;
        propositionBodyElement.appendChild(idPropositionElement);
  
        const typePropositionElement = document.createElement('p');
        typePropositionElement.textContent = `Type Proposition: ${proposition.type}`;
        propositionBodyElement.appendChild(typePropositionElement);
  
        const statutPropositionElement = document.createElement('p');
        statutPropositionElement.textContent = `Statut Proposition: ${proposition.statut}`;
        propositionBodyElement.appendChild(statutPropositionElement);
  
        const servicePropositionElement = document.createElement('p');
        servicePropositionElement.textContent = `Service Proposition: ${proposition.service}`;
        propositionBodyElement.appendChild(servicePropositionElement);
  
        let idProduitText = '';
  
        if (proposition.id_electronique != null) {
          idProduitText = `N° Produit: ${proposition.id_electronique}`;
        } else if (proposition.id_electromenager != null) {
          idProduitText = `N° Produit: ${proposition.id_electromenager}`;
        } else if (proposition.id_immobilier != null) {
          idProduitText = `N° Produit: ${proposition.id_immobilier}`;
        }
  
        const idProduitElement = document.createElement('p');
        idProduitElement.textContent = idProduitText;
        propositionBodyElement.appendChild(idProduitElement);
  
        const idUtilisateurElement = document.createElement('p');
        idUtilisateurElement.textContent = `N° Utilisateur: ${proposition.id_utilisateur}`;
        propositionBodyElement.appendChild(idUtilisateurElement);
  
        const validerButton = document.createElement('a');
        validerButton.href = '#';
        validerButton.classList.add('btn', 'btn-primary');
        validerButton.textContent = 'Valider';
        propositionBodyElement.appendChild(validerButton);
  
        // Ajouter le corps de la proposition à la proposition et la proposition au conteneur des propositions
        propositionElement.appendChild(propositionBodyElement);
        propositionsContainer.appendChild(propositionElement);
      });
    } catch (error) {
      console.error('Une erreur est survenue lors de la récupération des propositions :', error);
    }
  }
  
  // Appeler la fonction pour récupérer et afficher les propositions
  getPropositions();
  