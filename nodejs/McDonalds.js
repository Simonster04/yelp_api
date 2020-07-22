const fetch = require('node-fetch');

async function mcRestaurants(apiKey, endpoint, headers) {

    const params = {
        'term': "McDonald's",
        'limit': 50,
        'offset': 0,
        'radius': 1000,
        'location': 'Washington, DC'
    };

    try {
        let baseUrl = new URL(endpoint);
        Object.keys(params).forEach(key => baseUrl.searchParams.append(key, params[key]));

        let sumOfRates = 0;
        const response = await fetch(baseUrl, { headers: headers });
        const data = await response.json();
        const totalRestaurants = data.total;
        const restaurants = data.businesses;

        for (let restaurant of restaurants){
            sumOfRates += restaurant.rating;
        }

        const average = sumOfRates / totalRestaurants; 
        console.log("McDonalds' average:", Math.round((average + Number.EPSILON) * 100) / 100);
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = mcRestaurants;