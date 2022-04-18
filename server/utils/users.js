const moment = require('moment');
const { signoff } = require('../functions/userFunctions');
let users = [];
let messages = {}
// Join user to chat
function userJoin(id, socketId, username, email, name, profile) {
  const time = moment().format("h:mm a")
  const user = { id, socketId, username, email, name, profile, time };
  let obj = users.find(obj => obj.id == id)

  if (obj == undefined) {
    users.push(user);
  }
  console.log(user);
  return user;
}

// Get current user
function getCurrentUser(id) {

  return users.find(user => user.id === id);
}
function getCurrentUserBySocketId(id) {
  return users.find(user => user.socketId === id)
}

//getAllUsSer onl
function getUsersOnline() {
  return users
}
// User leaves chat
async function userLeave(socketId) {
  const index = users.findIndex(user => user.socketId === socketId);

  if (index !== -1) {
    let getUser = getCurrentUserBySocketId(socketId)
    await signoff(getUser.id)
    let user = users[index]
    users = users.filter((obj, i) => i != index)
    console.log("users leaves", users);
    return { user, lastSeen: moment().format("h:mm a") }
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
  getCurrentUserBySocketId,
  getUsersOnline
};
