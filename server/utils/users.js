let users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  console.log(users);
  return user;
}

// Get current user
function getCurrentUser(id) {

  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
  const index = users.findIndex(user => user.id === id);

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
  getRoomUsers
};
