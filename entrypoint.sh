
#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

docker-compose up -d --build
yarn
yarn prisma migrate dev --name init
yarn start