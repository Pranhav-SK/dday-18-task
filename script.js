// Function to fetch data from URL
function fetchData(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Function to display cat facts
function displayCatFacts() {
    fetchData('https://alexwohlbruck.github.io/cat-facts/')
        .then(data => {
            const catFactsDiv = document.getElementById('catFacts');
            catFactsDiv.innerHTML = '<h2>Daily Cat Facts</h2>';
            // Displaying random cat facts
            for (let i = 0; i < 5; i++) {
                const fact = data.all[Math.floor(Math.random() * data.all.length)].text;
                catFactsDiv.innerHTML += `<p>${fact}</p>`;
            }
        })
        .catch(error => console.error('Error fetching cat facts:', error));
}

// Function to display random dog facts
function displayDogFacts() {
    fetchData('https://dog-facts-api.herokuapp.com/api/v1/resources/dogs/all')
        .then(data => {
            const dogFactsDiv = document.getElementById('dogFacts');
            dogFactsDiv.innerHTML = '<h2>Random Dog Facts</h2>';
            // Displaying random dog images
            data.message.forEach(img => {
                dogFactsDiv.innerHTML += `<img src="${img}" alt="Dog Image">`;
            });
        })
        .catch(error => console.error('Error fetching dog facts:', error));
}

// Function to display cat for every HTTP Status
function displayCatHttpStatus() {
    const httpStatusDiv = document.getElementById('httpStatus');
    httpStatusDiv.innerHTML = '<h2>Cat for Every HTTP Status</h2>';
    const httpStatusCodes = [100, 200, 300, 400, 500];
    httpStatusCodes.forEach(code => {
        httpStatusDiv.innerHTML += `<p>${code}: <img src="https://http.cat/${code}" alt="Cat for HTTP Status ${code}"></p>`;
    });
}

// Calling functions on page load
window.onload = function() {
    displayCatFacts();
    displayDogFacts();
    displayCatHttpStatus();
};
