# POKEQUEST

## Services

A description of all the microservices used

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/11596410-72d3c403-3b86-4b37-b740-e86277e647c2?action=collection%2Ffork&collection-url=entityId%3D11596410-72d3c403-3b86-4b37-b740-e86277e647c2%26entityType%3Dcollection%26workspaceId%3D94061803-758a-49ad-aaac-d9e00725820f)

### Simple Microservices (Ports 8000 - 8999)

> Below are the ports of the (atomic) microservices used. They are used to only communicate with the database tables of the same name

| Services               | Ports      |
|:----------------------:|:----------:|
| Pokemon                |    8000    |
| Mission                |    8001    |
| Mission_Pokemon        |    8002    |
| Trainer_Mission        |    8003    |
| Trainer_Pokemon        |    8004    |
| Trainer_Mission_Pokemon|    8005    |

### Complex Microservices (Ports 9000 - 9999)

> Below are the ports of the complex microservices used. They talk with the simpler microservices and combines the data before passing to the webUI

| Services                | Description            | Ports      |
|:-----------------------:|:----------------------:|:----------:|
| Mission_Management_Admin| Manage the features use by the admin (Add mission) |    9000    |
| Mission_Management      | Manage all the features of missions (Join, View)   |    9001    |
| Pokemon_Management      | Handle Pokemon features (View Pokemon Count, Submit Pokemon)  |    9002    |

### Web (Port 3000)

> The front-end and the additional back-end of the web application. The back-end communicates with the complex microservices so that we do not have to reveal the port numbers of these microserivces to the public Internet in production

| Services              | Ports      |
|:---------------------:|:----------:|
| Pokequest-Web         |    3000    |

### Others

> Database, RabbitMQ

| Services                      | Ports   |
|:-----------------------------:|:-------:|
| Postgres                      | 5432    |
| RabbitMQ (Main)               | 5672    |
| RabbitMQ (Management Console) | 15672   |

## Development

Run the following commands:

```bash
# clone the repo
git clone https://github.com/the-weds-meetup/pokequest.git

# create docker-compose.yml
cp docker-compose.yml.example docker-compose.yml

# replace <docker_id> with your actual docker id
# insert the required keys for Google OpenAuth and Twitter API keys

# build the containers
docker-compose build

# run the containers
docker-compose up
```

### Pre-requisites

1. Docker

1. [Google OpenAuth Client Key](https://developers.google.com/identity/protocols/oauth2)

1. [Twitter Developer Account](https://developer.twitter.com/)

### Localhost Development

1. Node.js (v14)

1. Python3

## Contribution

See our [CONTRIBUTION](./CONTRIBUTION.md)
