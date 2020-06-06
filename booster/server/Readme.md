Pacotes instalados
yarn add express
yarn add typescript -D
yarn add @types/express -D
yarn add ts-node -D
yarn add ts-node-dev -D
yarn add knex
yarn add sqlite3

Configuração
npx tsc --init
"scripts": {
  "dev": "ts-node-dev src/server.ts"
},

Knex migrations
yarn knex:migrate
yarn knex:seed

Execução
yarn dev
