import mcdonalds
import dc_restaurants

API_KEY = 'oClqBPAHaP3N8wjPLUO72TPDkykrsWcxCkAbiA-N_5tlbGc4FXkNRu6fhLtMk5jAhQLGBPalr5dVvl2dbtaYCP_llA60MHzk5yOLOfcs_64wJjm_mERkSjxmmFgGX3Yx'
ENDPOINT = 'https://api.yelp.com/v3/businesses/search'
HEADERS = {'Authorization': 'bearer %s' % API_KEY}

dc_restaurants(API_KEY, ENDPOINT, HEADERS)
mcdonalds(API_KEY, ENDPOINT, HEADERS)