//storing users in memory right now but should implement with a db
const users: { id: number; username: string; room: number }[] = []


// Join user to chat
function userJoin(id:number, username:string, room: number) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id: number) {
  return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id: number) {
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get room users
function getRoomUsers(room: number) {
  return users.filter(user => user.room === room);
}

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};