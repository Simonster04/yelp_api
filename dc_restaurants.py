# Import the modules, endpoint, headers and api_key
import requests
import json
import sys


def dc_restaurants_average(API_KEY, ENDPOINT, HEADERS):

    offset = -50
    dc_restaurants_rating = 0
    counter = 0

    # BUSINESS SEARCH PARAMETERS
    while( counter <= 6600):
        if offset < 950:
            offset += 50
        else:
            break
            
        PARAMETERS_DC = {
                    "categories":[{"alias": "fastfood", "title": "Fast Food"}],
                    'limit': 50,
                    'offset': offset,
                    'radius': 40000,
                    'location': 'Washington, DC'}

        # Make a request to the Yelp API
        response_dc = requests.get(url = ENDPOINT,
                                params = PARAMETERS_DC,
                                headers = HEADERS)

        # Conver the JSON String and extract the restaurants
        dc_data = response_dc.json()
        dc_restaurants = dc_data['businesses']

        #print the response for McDonald's
        aux = 0
        for restaurant in dc_restaurants:
            if restaurant['location']['state'] == 'DC' and restaurant['location']['city'] == 'Washington, DC':
                dc_restaurants_rating += restaurant['rating']
                counter += 1
    print("Average DC restaurants rating: {}".format(round((dc_restaurants_rating / counter), 2)))

sys.modules[__name__] = dc_restaurants_average