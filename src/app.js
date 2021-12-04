const app = require('fastify')({
  logger: true
});
const {
  getAllUsers,
  getOneUser,
  addUser,
  returnUserWithoutPass,
  updateUser,
  deleteUser
} = require('./resources/users/user.service');

const {
  getAllBoards, getOneBoard, addBoard, updateBoard, deleteBoard
} = require('./resources/users/board.service');
const { getAllTasks, getOneTask, addTask, updateTask, deleteTask } = require('./resources/users/task.service');

app.get('/users', async () => getAllUsers().map(x => returnUserWithoutPass(x)));

app.get('/users/:userId', async (req) => {
  const { userId } = req.params;

  return returnUserWithoutPass(getOneUser(userId));
});

app.post('/users', async (req, res) => {
  res.status(201);

  return returnUserWithoutPass(addUser(req.body));

});

app.put('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  res.status(200);
  return returnUserWithoutPass(updateUser(userId, req.body));
});

app.delete('/users/:userId', async (req, res) => {
  const { userId } = req.params;
  res.status(204);
  return deleteUser(userId);
});

app.get('/boards', async () =>
  // console.log(res.body.find(e => e.id === '17af78ee-3c30-4ec1-a849-53907e37199d'));
  getAllBoards()
);

app.get('/boards/:boardId', async (req, res) => {
  const { boardId } = req.params;
  if (!getOneBoard(boardId)[0]) {
    res.status(404);
    res.send('no ID');

  } else {
    const answer = await getOneBoard(boardId)[0];
    res.send(answer);
  }

});

app.post('/boards', async (req, res) => {
  res.status(201);
  return addBoard(req.body);

});

app.delete('/boards/:boardId', async (req, res) => {
  const { boardId } = req.params;
  res.status(204);
  return deleteBoard(boardId);
});


app.put('/boards/:boardId', async (req, res) => {
  const { boardId } = req.params;
  res.status(200);
  return updateBoard(boardId, req.body);
});

app.get('/boards/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    res.status(200);
    return getAllTasks(boardId);
  }
);

app.post('/boards/:boardId/tasks', async (req, res) => {
    const { boardId } = req.params;
    res.status(201);
    return addTask(boardId, req.body);
  }
);

app.get('/boards/:boardId/tasks/:taskId', async (req, res) => {
    const { boardId, taskId } = req.params;
    if (!getOneTask(boardId, taskId)) {
      res.status(404);
      return res.send('no ID');
    }
    res.status(200);
    return getOneTask(boardId, taskId);


  }
);


app.put('/boards/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  res.status(200);
  return updateTask(boardId, taskId, req.body);
});


app.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
  const { boardId, taskId } = req.params;
  res.status(204);
  return deleteTask(boardId, taskId);
});


module.exports = app;


// const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
// const userRouter = require('./resources/users/user.router');
//
// const app = express();
// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
//
// app.use(express.json());
//
// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//
// app.use('/', (req, res, next) => {
//   if (req.originalUrl === '/') {
//     res.send('Service is running!');
//     return;
//   }
//   next();
// });
//
// app.use('/users', userRouter);
//
// module.exports = app;
