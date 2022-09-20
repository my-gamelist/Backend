import os
import signal

import schedule
import time

from database import Database
from logger import Logger
from steamapi import get_appid_list, get_app_detail

pwd = os.getcwd()

# Updates the database every 24 hours
# can optionally take in a predefined app id list for testing or manual updating 
def update_gamelist(current_gamelist=None):
    db = Database()
    logger = Logger()

    def signal_handler(sig, frame):
        logger.close_files()
        db.close_connection()
        print('Exiting...')
        exit(1)

    signal.signal(signal.SIGINT, signal_handler)

    # get current list by calling steam API if a preset one was not given
    if current_gamelist == None:
        current_gamelist = set(get_appid_list())
    
    # look at all game ids in updated list and see if they are in the previous list
    for appid in current_gamelist:
        try:
            # check if in excluded table
            if db.check_excluded(appid) == True:
                continue
        
             # if they are not in the current database, check if valid then add to database via query
            if db.get_game(appid) == None:
                
                game = get_app_detail(appid)
                if game != None:
                    # add the game to the database
                    db.add_game(
                        game['appid'],
                        game['name'],
                        game['release_date'],
                        0, # rating
                        0, # num_reviews
                        game['detailed_description'],
                        game['developers'],
                        game['publishers']
                    )

                    # save the game id to the log file
                    logger.save_logs(str(game['appid']))     
                
                # if the game is not valid, add it to the exclude list for next time
                else:
                    db.add_exclusion(appid)
        except Exception as e:
            # add the game to the failed file
            print(str(e))
            logger.save_failed(str(appid))
            continue
        
    # close the connection
    db.close_connection()

    # close the files
    logger.close_files()


def main():

    update_gamelist()
    # update the database every 24 hours
    # schedule.every().day.at('18:50').do(update_gamelist)

    # schedule.every(24).hours.do(update_gamelist)

    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)


if __name__ == '__main__':
    main()