const usersRepo = require('./user.memory.repository');

const getAllUsers = () => usersRepo.getAll();
const getOneUser = (userId) => usersRepo.getOne(userId);
const addUser = (user) => usersRepo.addUser(user);
const updateUser = (userId, body) => usersRepo.updateUser(userId, body);
const deleteUser = (userId) => usersRepo.deleteUser(userId);

function returnUserWithoutPass(user) {
    const { id, name, login } = user;
    return { id, name, login };
}

module.exports = { getAllUsers, getOneUser ,addUser, returnUserWithoutPass, updateUser, deleteUser};
