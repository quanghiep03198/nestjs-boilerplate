chmod +x ./scripts/docker.sh

#!/bin/bash

# Drop previous containers
docker-compose --file docker-compose.yml down

# Drop previous images
docker rmi $(docker image ls -q)

# Drop previous volumes
docker volume rm $(docker volume ls -q)

# Run docker compose
docker-compose --file docker-compose.yml up --detach --build -V

# Initialize replica set for mongodb
docker exec -it mongodb-primary ./scripts/rs-init.sh