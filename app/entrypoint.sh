
#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

yarn install
yarn prisma migrate deploy
yarn start