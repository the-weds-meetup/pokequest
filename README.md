# POKEQUEST

## Services

All services and Web are found within these ports

| Descriptions           | Ports       |
|:----------------------:|:-----------:|
| Simple Microservice    | 8000 - 8999 |
| Complex Microservice   | 9000 - 9999 |
| Web UI                 | 3000        |

## Development

Run the following commands:

```bash
# clone the repo
git clone https://github.com/the-weds-meetup/pokequest.git

# create docker-compose.yml
cp docker-compose.yml.example docker-compose.yml

# replace <docker_id> with your actual docker id

# run the microservices
docker-compose up --build

# run the web UI
cd pokequest-web
yarn
yarn dev
```

### Pre-requisites

1. Docker

1. Node.js (v14)

## Contribution

See our [CONTRIBUTION](./CONTRIBUTION.md)
