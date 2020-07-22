const fetch = require('node-fetch');

async function dcRestaurants(apiKey, endpoint, headers) {

    let sumOfRates = 0;
    let totalRestaurants = 0;

    for (let offset = 0; offset < 950; offset += 50) {

        const params = {
            "categories": [{ "alias": "fastfood", "title": "Fast Food" }],
            'limit': 50,
            'offset': offset,
            'radius': 10000,
            'location': 'Washington, DC'
        }

        try {
            let baseUrl = new URL(endpoint);
            Object.keys(params).forEach(key => baseUrl.searchParams.append(key, params[key]));

            const response = await fetch(baseUrl, { headers: headers });
            const data = await response.json();
            const restaurants = data.businesses;

            for (let restaurant of restaurants) {
                sumOfRates += restaurant.rating;
                totalRestaurants += 1;
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    const average = sumOfRates / totalRestaurants;
    console.log("DC average:", Math.round((average + Number.EPSILON) * 100) / 100);
}

module.exports = dcRestaurants;