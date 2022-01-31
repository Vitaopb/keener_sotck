
#!/bin/bash

docker-compose up -d --build
yarn install
yarn prisma generate