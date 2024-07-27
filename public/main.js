
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim(); // Remove any leading or trailing spaces
    const state = document.getElementById('state').value.trim();

    // If the city or state field is empty, show an error message
    if (city === '' || state === '') {
        document.getElementById('results').innerHTML = 'Please enter both a city and state name.';
        return;
    }
    // If the state input isn't two characters, show an error message
    if (state.length != 2) {
        document.getElementById('results').innerHTML = 'Please enter a valid state abbreviation.';
        return;
    }

    const url = `/events?location=${encodeURIComponent(city)}, ${encodeURIComponent(state)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            display(data.events_results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = 'An error occurred while fetching data.';
        });
});

// Displays all of the event results from the JSON response
function display(data) {
    const divResult = document.getElementById('results');
    divResult.innerHTML = '';
    let resultData = '';
    if (data) {
        for (const element of data) {
            resultData += `<h2><a href="${element.link}" target="_blank">${element.title}</a></h2>`;
            if (element.description) {
                resultData += `<p>${element.description}</p><hr>`;
            } else {
                resultData += `<p>No description provided.</p><hr>`
            }
        }
        divResult.innerHTML = resultData;
    } else {
        divResult.innerHTML = 'No results found';
    }
}

