#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import json
import os
import tweepy

from dotenv import load_dotenv
import amqp_setup

load_dotenv()

# environment
consumer_key = os.environ.get('CONSUMER_KEY') # twitter api key
consumer_secret = os.environ.get('CONSUMER_SECRET') # twitter secret
access_token = os.environ.get('ACCESS_TOKEN') # twitter bot account
access_token_secret = os.environ.get('ACCESS_TOKEN_SECRET') # twitter bot secret


monitorBindingKey='*.notification'

#Twitter API Key please remove if you intend to push it to github
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

try:
    api.verify_credentials()
    print("Authentication OK")
except:
    print("Error during authentication")


def receiveNotifications():
    amqp_setup.check_setup()
    
    queue_name = "Notification"  

    # set up a consumer and start to wait for coming messages
    amqp_setup.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)
    amqp_setup.channel.start_consuming() # an implicit loop waiting to receive messages; 
    #it doesn't exit by default. Use Ctrl+C in the command window to terminate it.

def callback(channel, method, properties, body): # required signature for the callback; no return
    print("\nReceived a notification  by " + __file__)
    process(body)
    print() # print a new line feed

def process(message):
    api.update_status(message)
    print("Printing the message:", message)
    print("Message has been tweeted")
    print()


if __name__ == "__main__":  # execute this program only if it is run as a script (not by 'import')    
    print("\nThis is " + os.path.basename(__file__), end='')
    print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename))
    receiveNotifications()
