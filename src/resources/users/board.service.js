const usersRepo = require('./user.memory.repository');

const getAllBoards = () => usersRepo.getAllBoards();
const getOneBoard = (boardId) => usersRepo.getOneBoard(boardId);
const addBoard = (board) => usersRepo.addBoard(board);
const updateBoard = (boardId, body) => usersRepo.updateBoard(boardId, body);
const deleteBoard = (boardId) => usersRepo.deleteBoard(boardId);


module.exports = { getAllBoards, getOneBoard, addBoard, updateBoard, deleteBoard };
