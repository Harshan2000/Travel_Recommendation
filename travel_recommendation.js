const conditionInput = document.getElementById("conditionInput");
const btnSearch = document.getElementById('btnSearch');
const resultsDiv = document.getElementById('results');
const btnClear = document.getElementById('btnClear'); // Get reference to clear button

function clearResults() {
  resultsDiv.innerHTML = '';
  conditionInput.value = ''; 
}

function searchCondition() {
  const input = conditionInput.value.toLowerCase();
  resultsDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const { countries, temples, beaches } = data;
      const results = [];

      // Search countries
      if (input.includes('beach')) {
        results.push(...beaches);
      } else if (input.includes('temple')) {
        results.push(...temples);
      } else {
        const foundCountries = countries.filter(country => country.name.toLowerCase() === input);
        foundCountries.forEach(country => results.push(...country.cities));
      }

      if (results.length > 0) {
        const cityDiv = document.createElement('div');
        cityDiv.innerHTML = `<h1>Recommended Places</h1>`;
        results.forEach(place => {
          cityDiv.innerHTML += `
            <h3>${place.name}</h3>
            <img src="${place.imageUrl}" alt="${place.name}">
            <h4 style="background-color: white;">${place.description}</h4>
          `;
        });

        resultsDiv.appendChild(cityDiv);
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
      } else {
        resultsDiv.innerHTML = 'No results found.';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsDiv.innerHTML = 'An error occurred while fetching data.';
    });
    btnClear.addEventListener('click', clearResults);
}

btnSearch.addEventListener('click', searchCondition);


  