const { v4: uuidv4 } = require('uuid');

const data = {
  user: [
    {
      id: '17af78ee-3c30-4ec1-a849-53907e37199d',
      name: 'TEST_USER',
      login: 'test_user',
      password: '1T35t_P@55w0rd'
    },
    {
      id: '927f5a59-88f7-44f5-8c06-d8c0330ca5fc',
      name: 'TEST_USER2',
      login: 'test_user2',
      password: '2T35t_P@55w0rd'
    }
  ],
  boards: [
    {
      id: '7841d0a8-f893-4a8a-a8e7-cb71e12181c3',
      title: 'Autotest board111',
      columns: [
        {
          id: '7367e3f7-dbcb-488a-8669-36e4b7224506',
          title: 'Backlog',
          order: 1
        },
        {
          id: 'ff03c88e-aae2-40e4-b933-555ea79a1634',
          title: 'Sprint',
          order: 2
        }
      ]
    },
    {
      id: '7841d0a8-f893-4a8a-a8e7-cb71e12181c2',
      title: 'Autotest board222',
      columns: [
        {
          id: '7367e3f7-dbcb-488a-8669-36e4b7224505',
          title: 'Backlog222',
          order: 1
        },
        {
          id: '7367e3f7-dbcb-488a-8669-36e4b7224501',
          title: 'Sprint222',
          order: 2
        }
      ]
    }
  ],
  task: [
    {
      id: '7367e3f7-dbcb-489a-8669-36e4b7224509',
      title: 'Autotest task111',
      order: 0,
      description: 'task111task111task111',
      userId: '17af78ee-3c30-4ec1-a849-53907e37199d',
      boardId: '7841d0a8-f893-4a8a-a8e7-cb71e12181c3',
      columnId: '7367e3f7-dbcb-488a-8669-36e4b7224506'
    },
    {
      id: '8367e8f7-dbcb-489a-8669-36e4b7224509',
      title: 'Autotest task222',
      order: 0,
      description: 'task222task222task222',
      userId: '17af78ee-3c30-4ec1-a849-53907e37199d',
      boardId: '7841d0a8-f893-4a8a-a8e7-cb71e12181c3',
      columnId: '7367e3f7-dbcb-488a-8669-36e4b7224506'
    }
  ]
};

const getAll = () => data.user;

const getOne = userId => data.user.filter(x => x.id === userId)[0];

function addUser(user) {
  const newUser = user;
  newUser.id = uuidv4();
  data.user.push(newUser);
  return user;
}

function updateUser(userId, body) {

  let userIndex = null;
  for (let i = 0; i < data.user.length; i += 1) {
    if (data.user[i].id === userId) {
      userIndex = i;
      break;
    }
  }
  const updatedUser = {
    ...body,
    id: userId,
    password: data.user[userIndex].password

  };

  data.user[userIndex] = { ...updatedUser };
  return updatedUser;
}

function deleteUser(userId) {
  let userIndex = null;
  for (let i = 0; i < data.user.length; i += 1) {
    if (data.user[i].id === userId) {
      userIndex = i;
      break;
    }
  }

  data.user.splice(userIndex, 1);

  for (let i = 0; i < data.task.length; i += 1) {
    if(data.task[i].userId === userId){
      data.task[i].userId = null
    }
  }


}


const getAllBoards = () => data.boards;

function getOneBoard(boardId) {

  return data.boards.filter(x => x.id === boardId);
}

function addBoard(board) {
  const newBoard = board;
  newBoard.id = uuidv4();
  data.boards.push(newBoard);
  return newBoard;
}

function deleteBoard(boardId) {
  let boardIndex = null;
  for (let i = 0; i < data.boards.length; i += 1) {
    if (data.boards[i].id === boardId) {
      boardIndex = i;
      break;
    }
  }
  data.boards.splice(boardIndex, 1);

  data.task = data.task.filter(x => x.boardId !== boardId)



}

function updateBoard(boardId, body) {

  let boardIndex = null;
  for (let i = 0; i < data.boards.length; i += 1) {
    if (data.boards[i].id === boardId) {
      boardIndex = i;
      break;
    }
  }
  const updatedBoard = {
    ...body,
    id: boardId

  };

  data.boards[boardIndex] = { ...updatedBoard };
  return updatedBoard;
}

function getAllTasks(brdId) {
  return data.task.filter(x => x.boardId === brdId)
}

function addTask(boardId, task) {
  const newTask = task;
  newTask.id = uuidv4();
  newTask.boardId = boardId;
  data.task.push(newTask);
  return newTask;
}

function getOneTask(boardId, taskId) {

  return data.task.filter(x => x.boardId === boardId && x.id === taskId)[0];
}

function updateTask(boardId, taskId, task) {

  let taskIndex = null;
  for (let i = 0; i < data.task.length; i += 1) {
    if (data.task[i].boardId === boardId && data.task[i].id === taskId) {
      taskIndex = i;
      break;
    }
  }
  const updatedBoard = {
    ...task,
    id: taskId,
    boardId

  };

  data.task[taskIndex] = { ...updatedBoard };
  return updatedBoard;
}

function deleteTask(boardId, taskId) {
  let taskIndex = null;
  for (let i = 0; i < data.task.length; i += 1) {
    if (data.task[i].boardId === boardId && data.task[i].id === taskId) {
      taskIndex = i;
      break;
    }
  }

  data.task.splice(taskIndex, 1);

}

module.exports = {
  getAll,
  getOne,
  addUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getOneBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  getAllTasks,
  addTask,
  getOneTask,
  updateTask,
  deleteTask
};
