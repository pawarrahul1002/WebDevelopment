let users = [];

class User {
  constructor({ id, name, email, password }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

const createUser = (user) => {
  const newUser = new User({ ...user, id: users.length + 1 });
  users.push(newUser);
  return newUser;
};

const findUserByEmail = (email) => users.find((user) => user.email === email);

module.exports = { createUser, findUserByEmail };

