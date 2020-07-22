const dcRestaurants = require('./DcRestaurants');
const mcDonalds = require('./McDonalds');

//Global variables
const API_KEY = 'oClqBPAHaP3N8wjPLUO72TPDkykrsWcxCkAbiA-N_5tlbGc4FXkNRu6fhLtMk5jAhQLGBPalr5dVvl2dbtaYCP_llA60MHzk5yOLOfcs_64wJjm_mERkSjxmmFgGX3Yx'
const ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
const HEADERS = {Authorization: 'bearer ' + API_KEY}

// Main function, that calls the functions related to DC average and Mc's average
const App = async (apiKey, endpoint, headers) => {
    dcRestaurants(apiKey, endpoint, headers);
    mcDonalds(apiKey, endpoint, headers);
};


// Execution of Main Function
App(API_KEY, ENDPOINT, HEADERS);