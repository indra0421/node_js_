const users = [];

const addUser = (id, username, channel) => {
  if (!username || !id || !channel) {
    return {
      error: "username and channel can't be blank",
    };
  }
  //username kontrolü
  const existingUser = users.find(
    (user) => user.channel === channel && user.username === username
  );

  if (existingUser) return { error: "That Username exist" };

  const user = { id, username, channel };
  users.push(user);
  return {user};
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const removeUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  return userIndex !== -1 ? users.splice(userIndex, 1)[0] : -1;
  
};

const getUserListInChannel = (channel) => {
  return users.filter((user) => user.channel === channel);
};

module.exports = {
  addUser,
  getUser,
  removeUser,
  getUserListInChannel,
};
