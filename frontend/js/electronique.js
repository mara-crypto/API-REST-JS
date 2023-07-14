document.addEventListener('DOMContentLoaded', async function() {
    var productList = document.getElementById('product-list');

    try {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'Content-Type': 'application/json'}
        };

        // Effectuer la requête vers votre API en utilisant fetch et attendre la réponse
        const response = await fetch('http://localhost:3000/api/electroniques', options);
        const data = await response.json();

        // Vérifier si la réponse est OK
        if (response.ok) {
            var productListHTML = '';

            // Parcourir les données et générer le contenu HTML pour chaque produit
            data.forEach(function(product, index) {
                productListHTML += '<div class="col mb-4">' +
                    '<div class="card h-100">' +
                    '<img src="' + product.image + '" class="card-img-top" alt="Product Image">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + product.title + '</h5>' +
                    '<p class="card-text">Prix: ' + product.price + '</p>' +
                    '<p class="card-text">Location: ' + product.location + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';

                // Ajouter un saut d'espace après chaque groupe de 4 produits
                if ((index + 1) % 4 === 0) {
                    productListHTML += '<div class="w-100"></div>'; // Saut d'espace
                }
            });

            // Insérer le contenu HTML dans la div "product-list"
            productList.innerHTML = productListHTML;

            // Appliquer l'égalisation de hauteur aux cartes
            $('.row-cols-1 .card').matchHeight();
        } else {
            console.log('Erreur lors de la récupération des données de l\'API. Statut:', response.status);
        }
    } catch (error) {
        console.log('Erreur lors de la requête vers l\'API:', error);
    }
});
