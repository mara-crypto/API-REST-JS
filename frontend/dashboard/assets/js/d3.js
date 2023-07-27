//  Recuperation du nombre de produit de chauqe categories

async function recuperationTotalElements(service) {
    var url = `http://localhost:3000/api/${service}`;
    console.log(url);

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const totalElement = data.length;
            return totalElement;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        return undefined;
    }
}


async function createBarChart() {
    let totalElementElectronique = await recuperationTotalElements('electroniques');
    let totalElementElectromenager = await recuperationTotalElements('electromenager');
    let totalElementImmobilier = await recuperationTotalElements('immobilier');

    console.log(totalElementElectromenager, "données electromenager");
    console.log(totalElementElectronique, "données electronique");
    console.log(totalElementImmobilier, "données immobilier");

    // Exemple de données (vous devez remplacer ces données par vos propres données)
    const data = [
        { categorie: "Électronique", nombre: totalElementElectronique, color: "blue" },
        { categorie: "Électroménager", nombre: totalElementElectromenager, color: "red" },
        { categorie: "Immobilier", nombre: totalElementImmobilier, color: "green" }
    ];


    // Définir les marges et les dimensions du graphique
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
  
    // Créer l'échelle x pour les catégories
    const x = d3
      .scaleBand()
      .domain(data.map(d => d.categorie))
      .range([0, width])
      .padding(0.3);
  
    // Créer l'échelle y pour le nombre de produits
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.nombre)])
      .nice()
      .range([height, 0]);
  
    // Créer l'axe x
    const xAxis = d3.axisBottom(x);
  
    // Créer l'axe y
    const yAxis = d3.axisLeft(y);
  
    // Créer l'élément svg pour le graphique
    const svg = d3
      .select("#chart")
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Créer les barres du graphique
// Créer une échelle de couleur
const colorScale = d3.scaleOrdinal()
  .domain(data.map(d => d.categorie))
  .range(d3.schemeCategory10); // Utiliser une palette de couleurs prédéfinie (ici, d3.schemeCategory10)

// Créer les barres du graphique avec les couleurs de l'échelle
svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", d => x(d.categorie))
  .attr("y", d => y(d.nombre))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d.nombre))
  .attr("fill", d => colorScale(d.categorie)); // Utiliser l'échelle de couleur pour définir la couleur de remplissage
//   .attr("fill", d => (d.color)); // Utiliser l'échelle de couleur pour définir la couleur de remplissage

  
    // Ajouter l'axe x au graphique
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);
  
    // Ajouter l'axe y au graphique
    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);    
}

createBarChart()



async function createPieChartLocalisation() {
  const data = await getDataForLocalisationPieChart();

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2 - 10;

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3
    .select("#pie-chart-localisation")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pie = d3.pie().value(d => d.count);

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);

  const arcs = svg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colorScale(i));

  arcs
    .append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data.localisation);
}

async function getDataForLocalisationPieChart() {
  // Vous devrez récupérer les données pour le diagramme circulaire de localisation
  // depuis votre API et les organiser au format suivant (exemple) :
  return [
    { localisation: "Paris", count: 50 },
    { localisation: "Lyon", count: 30 },
    { localisation: "Marseille", count: 20 },
  ];
}

createPieChartLocalisation();



async function createPieChartPrix() {
  const data = await getDataForPrixPieChart();

  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = 400;
  const height = 400;
  const radius = Math.min(width, height) / 2 - 10;

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const svg = d3
    .select("#pie-chart-prix")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const pie = d3.pie().value(d => d.count);

  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(radius);

  const arcs = svg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => colorScale(i));

  arcs
    .append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data.priceRange);
}

async function getDataForPrixPieChart() {
  // Vous devrez récupérer les données pour le diagramme circulaire de prix
  // depuis votre API et les organiser au format suivant (exemple) :
  return [
    { priceRange: "0-50", count: 20 },
    { priceRange: "50-100", count: 30 },
    { priceRange: "100-150", count: 15 },
    // ... et ainsi de suite
  ];
}

createPieChartPrix();



async function createBarChartLocalisation() {
  const data = await getDataForLocalisationBarChart();

  const margin = { top: 30, right: 50, bottom: 60, left: 70 };
  const width = 800 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const x = d3
    .scaleBand()
    .domain(data.map(d => d.category))
    .range([0, width])
    .padding(0.3);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .nice()
    .range([height, 0]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);

  const svg = d3
    .select("#bar-chart-localisation")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => x(d.category))
    .attr("y", d => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.count))
    .attr("fill", "steelblue");

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis);
}

async function getDataForLocalisationBarChart() {
  // Vous devrez récupérer les données pour le diagramme à barres de localisation
  // depuis votre API et les organiser au format suivant (exemple) :
  return [
    { category: "iphone", count: 50 },
    { category: "laptop", count: 30 },
    { category: "chargeur", count: 20 },
    { category: "réfrigérateur", count: 15 },
    { category: "fer à repasser", count: 10 },
    // ... et ainsi de suite
  ];
}

createBarChartLocalisation();
