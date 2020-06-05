Pacotes instalados
yarn add express
yarn add typescript -D
yarn add @types/express -D
yarn add ts-node -D
yarn add ts-node-dev -D

Configuração
npx tsc --init
"scripts": {
  "dev": "ts-node-dev src/server.ts"
},

Execução
yarn dev