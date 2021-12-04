const usersRepo = require('./user.memory.repository');

const getAllTasks = (boardId) => usersRepo.getAllTasks(boardId);
const getOneTask = (boardId, taskId) => usersRepo.getOneTask(boardId, taskId);
const addTask = (boardId, task) => usersRepo.addTask(boardId, task);
const updateTask = (boardId, taskId, task) => usersRepo.updateTask(boardId, taskId, task);
const deleteTask = (boardId, taskId) => usersRepo.deleteTask(boardId, taskId);


module.exports = { getAllTasks, getOneTask, addTask, updateTask, deleteTask};
