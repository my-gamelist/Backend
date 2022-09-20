import requests


# gets a list of game app ids from the steam API
def get_appid_list():
    appid_list = []

    allgames = requests.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
    data = allgames.json()
    data = data['applist']['apps']

    # append each item to the list (list of integers)
    for item in data:
        appid_list.append(item['appid'])
    
    return appid_list


# check if an app id on list is a valid game
def check_game_validity(game_json, appid):
    try:
        # if the game does not exist
        if game_json == None:
            return False

        success = game_json[str(appid)]['success']

        # if the game has an info tab
        if not success:
            return False

        game_json = game_json[str(appid)]['data']

        # if the appid correlates to a game and the game is not in development
        if game_json['type'] == 'game':
            if game_json['release_date']['coming_soon'] == False:
                return True

        # returns false by default
        return False
    except:
        raise Exception(f'Failed to check game validity for {appid}')


# get the app detail from the steam API
def get_app_detail(appid):
    try:
        game_info = requests.get(f'http://store.steampowered.com/api/appdetails?appids={appid}')

        # convert json request into a python dictionary
        game_json = game_info.json()

        # check if the game is valid
        if check_game_validity(game_json, appid): 
            game_json = game_json[str(appid)]['data']

            # initialize the game dictionary
            data = {
                'appid': -1,
                'name': None,
                'release_date': None,
                'detailed_description': None,
                'developers': None,
                'publishers': None
            }
            
            # check if the keys exist in json, then add to the dictionary
            if 'steam_appid' in game_json:
                data['appid'] = game_json['steam_appid']

            if 'name' in game_json:
                data['name'] = game_json['name']

            if 'release_date' in game_json:
                if 'date' in game_json['release_date']:
                    data['release_date'] = game_json['release_date']['date']

            if 'detailed_description' in game_json:
                data['detailed_description'] = game_json['detailed_description']

            if 'developers' in game_json:
                data['developers']= ", ".join(game_json['developers'])

            if 'publishers' in game_json:
                data['publishers']= ", ".join(game_json['publishers'])
            
            return data
        
        # return None if the game is not valid
        return None
    except:
        raise Exception(f'Failed to get game info for {appid}')
