const fetch = require('node-fetch');

async function restaurantData(apiKey, endpoint, headers, name) {

    try {
        let sumOfRates = 0;
        let totalReviews = 0;
        let lowerThan30Reviews = 0;
        let totalRestaurants = 0;
        const params = {
            'term': name,
            'limit': 50,
            'offset': 0,
            'radius': 40000,
            'location': 'Washington, DC'
        };

        let baseUrl = new URL(endpoint);
        Object.keys(params).forEach(key => baseUrl.searchParams.append(key, params[key]));

        const response = await fetch(baseUrl, { headers: headers });
        const data = await response.json();
        const restaurants = data.businesses;

        for (let restaurant of restaurants) {
            if (restaurant.location.state === 'DC' && restaurant.location.city === 'Washington, DC') {
                sumOfRates += restaurant.rating;
                totalReviews += restaurant.review_count
                totalRestaurants += 1;
                if (restaurant.review_count < 30) {
                    lowerThan30Reviews += 1;
                }
            }
        }

        const average = sumOfRates / totalRestaurants;

        console.log('---------------', name, '---------------')
        console.log('Total of reviews for', name + ':', totalReviews);
        console.log(name, 'restaurants with less than 30 reviews:', lowerThan30Reviews);
        console.log('Total', name, 'restaurants:', totalRestaurants);
        console.log(name, 'average:', Math.round((average + Number.EPSILON) * 100) / 100);
        console.log(' ');

        return {
            'total_reviews': totalReviews,
            'brand': name,
            'less_than_30_reviews': lowerThan30Reviews,
            'total_restaurants': totalRestaurants,
            'average_rating': Math.round((average + Number.EPSILON) * 100) / 100
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = restaurantData;
