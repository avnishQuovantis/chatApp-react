const moment = require('moment');
let users = [];
let messages = {}
// Join user to chat
function userJoin(id, socketId, username, email, name) {
  const user = { id, socketId, username, email, name };

  users.push(user);
  console.log(user);
  return user;
}

// Get current user
function getCurrentUser(id) {

  return users.find(user => user.id === id);
}

//getAllUsSer onl
function getUsersOnline() {
  return users
}
// User leaves chat
function userLeave(socketId) {
  const index = users.findIndex(user => user.socketId === socketId);

  if (index !== -1) {
    let user = users[index]
    users = users.filter((obj, i) => i != index)
    console.log("users leaves", users);
    return user
  }
}

// Get room users
function getRoomUsers(room) {

  return users.filter(user => user.room === room);
}


module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,

  getUsersOnline
};
