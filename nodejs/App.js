const axios = require('axios');
const mcRestaurants = require('./restaurantData');

//Global variables
const API_KEY = process.env.API_KEY
const ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
const HEADERS = { Authorization: 'bearer ' + API_KEY }

// Main function, that calls the functions related to DC average and Mc's average
const App = async (apiKey, endpoint, headers) => {
    let restaurants = [];
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, "McDonald's"));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, 'Subway'));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, 'Taco Bell'));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, 'Chick-Fil-A'));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, "Wendy’s"));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, 'Burger King'));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, 'Starbucks'));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, 'Dunkin'));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, 'Panera Bread'));
    restaurants.push(await mcRestaurants(apiKey, endpoint, headers, "Chipotle Mexican Grill"));
    return restaurants;
};



// Request Yel'data and save it in mongoDB
const Execution = async () => {
    let brands = await App(API_KEY, ENDPOINT, HEADERS);
    for (let brand of brands) {
        axios.post('https://farliniumtest.herokuapp.com/brands/add', brand)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }
}

// Execution of Main Function
Execution();