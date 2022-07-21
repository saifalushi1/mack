//storing users in memory right now but should implement with a db like redis
// if the app gets too large
const users: Array<{ id: number; username: string; room: number }> = []


// Join user to chat
const userJoin = (id:number, username:string, room: number) => {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// Get current user
const getCurrentUser = (id: number) => {
  return users.find(user => user.id === id);
}


// User leaves chat
const userLeave = (id: number) => {
  const index = users.findIndex(user => user.id === id);
  const userToLeave = users[index]
  users.splice(index, 1)[0]
  return userToLeave;
}

// Get room users
const getRoomUsers = (room: number) => {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};