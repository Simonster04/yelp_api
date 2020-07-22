# Import the modules, endpoint, headers and api_key
import requests
import json
import sys


def mcdonalds_average(API_KEY, ENDPOINT, HEADERS):

    # BUSINESS SEARCH PARAMETERS: McDonald's
    PARAMETERS_MD = {'term': "McDonald's",
                'limit': 50,
                'offset': 0,
                'radius': 15000,
                'location': 'Washington, DC'}

    # Make a request to the Yelp API
    response_mcdonalds = requests.get(url = ENDPOINT,
                            params = PARAMETERS_MD,
                            headers = HEADERS)

    # Conver the JSON String and extract the restaurants
    mcdonalds_data = response_mcdonalds.json()
    mcdonalds_restaurants = mcdonalds_data['businesses']

    #print the response for McDonald's
    macdonalds_rating = 0
    counter = 0
    for restaurant in mcdonalds_restaurants:
        for key, val in restaurant.items():
            if key == 'name' and val == "McDonald's" and restaurant['location']['state'] == 'DC' and restaurant['location']['city'] == 'Washington, DC':
                macdonalds_rating += restaurant['rating']
                counter += 1
    print("Average McDonald's rating in DC: {}".format(round((macdonalds_rating / counter), 2)))

sys.modules[__name__] = mcdonalds_average