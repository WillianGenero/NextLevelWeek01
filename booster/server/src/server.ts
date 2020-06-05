import express, { response } from 'express';

const app = express();

app.use(express.json())
// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema

// Métodos:
// GET: Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualiza uma informação existente no backe-end
// DELETE: Deletar uma informação do back-end

// Request param: Parâmetros que vem na própria rota que identificam um recurso
// Query param: Parâmetros que vem na própria rota, geralmente opcionais para filtros, paginação, ...
// Request body: Parâmetros para criação/atualização de informações

const users = [
  'Diego',
  'Willian',
  'Duda'
];

app.get('/users', (request, response) => {
  const search = String(request.query.search);

  const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

  return response.json(filteredUsers);
});

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id);

  const user = users[id];

  return response.json(user)
});

app.post('/users', (request, response) => {
  const data = request.body;

  const user = {
    name: data.name,
    email: data.email,
  };

  return response.json(user);
});

app.listen(3333);
