function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
const href_proposition = document.getElementById("propositonlink");
const href_tableau_de_bord = document.getElementById("tableau_de_bord");

const token = localStorage.getItem('token');
const role = parseJwt(token).role;
if (role === "editeur"){
    href_proposition.setAttribute("href","proposition.html");
} else {
    href_tableau_de_bord.setAttribute("href", "dashboard/index.html");
};
       
