const conditionInput = document.getElementById("conditionInput");
const btnSearch = document.getElementById('btnSearch');
const resultsDiv = document.getElementById('results');

function searchCondition() {
  const input = conditionInput.value.toLowerCase();
  resultsDiv.innerHTML = ''; // Clear previous results

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      const country = data.countries.find(item => item.name.toLowerCase() === input);

      if (country) {
        country.cities.forEach(city => {
          const cityDiv = document.createElement('div');
          cityDiv.innerHTML = `
            <h2>${city.name}</h2>
            <img src="${city.imageUrl}" alt="${city.name}">
            <p>${city.description}</p>
          `;
          resultsDiv.appendChild(cityDiv);
        });
      } else {
        resultsDiv.innerHTML = 'Country not found.';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      resultsDiv.innerHTML = 'An error occurred while fetching data.';
    });
}

btnSearch.addEventListener('click', searchCondition);