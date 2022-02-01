
#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

docker-compose up -d --build
npm install
npm prisma migrate dev --name init
npm start