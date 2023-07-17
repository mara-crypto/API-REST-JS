// Récupérer le bouton de connexion
const loginButton = document.getElementById('loginButton');
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageContainer = document.getElementById('message-container');

// Gérer le clic sur le bouton de connexion
loginButton.addEventListener('click', async function(event) {
  event.preventDefault(); // Empêcher le rechargement de la page

  // Récupérer les valeurs des champs email et mot de passe
  const mail = emailInput.value;
  const password = passwordInput.value;

  // Effectuer la requête d'authentification
  try {
    const response = await fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mail, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Connexion réussie
      const token = data.token;

      // Stocker le token d'authentification dans le localStorage ou les cookies
      localStorage.setItem('token', token);
      // Rediriger vers la page d'accueil ou une autre page sécurisée
      window.location.href = 'index.html';
    } else {
      // Afficher un message d'erreur
      messageContainer.textContent = data.message;
    }
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la requête d\'authentification :', error);
    // Afficher un message d'erreur générique
    messageContainer.textContent = 'Une erreur s\'est produite lors de la connexion.';
  }
});


