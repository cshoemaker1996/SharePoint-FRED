document.addEventListener('DOMContentLoaded', function() {
    // URL of the proxy server or API endpoint
    const apiUrl = 'https://cors-anywhere.herokuapp.com/https://api.stlouisfed.org/fred/series/observations?series_id=GS10&api_key=230bfcd42f3ee31c1087f600619e9c91&file_type=json&limit=1';

    // Fetch the data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if data is available and has the expected structure
            if (data && data.observations && data.observations.length > 0) {
                const observation = data.observations[0];
                const yieldValue = observation.value;
                const date = observation.date;
                
                // Inject data into the HTML element
                const yieldElement = document.getElementById('treasury-yield');
                yieldElement.innerHTML = `<p>As of ${date}, the US 10-Year Treasury Yield is <strong>${yieldValue}%</strong>.</p>`;
            } else {
                console.error('No data available or unexpected data format.');
                document.getElementById('treasury-yield').innerHTML = '<p>Unable to retrieve data.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('treasury-yield').innerHTML = '<p>Error fetching data.</p>';
        });
});
