
// document.addEventListener('DOMContentLoaded', function() {
//   // Vérifier si un token est présent dans le localStorage
//   const token = localStorage.getItem('token');

//   if (token) {
//     // Un token est présent, masquer le bouton "Se Connecter" et afficher le nom d'utilisateur
//     const se_connecter = document.getElementById('se_connecter');
//     const username = document.getElementById('username');
//     const username_deconnecter= document.getElementById("username_deconnecter");

//     se_connecter.style.display = 'none';
//     username_deconnecter.style.display = 'block';
//     const tokendecoded = parseJwt(token);
//     const full_name = tokendecoded.mail;
//     username.textContent = full_name;
//     console.log(tokendecoded);

//   } else {
//     // Aucun token n'est présent, afficher le bouton "Se Connecter"
//     const se_connecter = document.getElementById('se_connecter');
//     se_connecter.style.display = 'block';
//   }

//   // Fonction pour extraire le nom d'utilisateur à partir du token
//   function parseJwt (token) {
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }
// })


document.addEventListener('DOMContentLoaded', function() {
  // Vérifier si un token est présent dans le localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Un token est présent, masquer le bouton "Se Connecter" et afficher le nom d'utilisateur et le bouton de déconnexion
    const se_connecter = document.getElementById('se_connecter');
    const username_deconnecter = document.getElementById('username_deconnecter');
    const username = document.getElementById('username');

    se_connecter.style.display = 'none';
    username_deconnecter.style.display = 'block';
    const decodedToken =  parseJwt(token);
    username.textContent = decodedToken.full_name

    // Gestionnaire d'événements pour le bouton de déconnexion
    const se_deconnecter = document.getElementById("deconnecter")
    se_deconnecter.addEventListener('click', function() {
      // Supprimer le token du localStorage
      localStorage.removeItem('token');
      // Rediriger vers la page de connexion
      window.location.href = 'index.html';
    });
  } else {
    // Aucun token n'est présent, afficher le bouton "Se Connecter" et masquer le bouton de déconnexion et le nom d'utilisateur
    const se_connecter = document.getElementById('se_connecter');
    const username_deconnecter = document.getElementById('username_deconnecter');
    const username = document.getElementById('username');

    se_connecter.style.display = 'block';
    username_deconnecter.style.display = 'none';
    username.textContent = '';
    username.value
  }

  // Fonction pour extraire le nom d'utilisateur à partir du token
  function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
});
