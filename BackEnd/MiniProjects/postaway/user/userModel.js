// userModel.js

const users = [];

const userModel = {
  getAllUsers: () => users,
  
  addUser: (user) => {
    const newUser = {
      id: users.length + 1,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    users.push(newUser);
    return newUser;
  },

  loginUser: (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    return user;
  },

  getUserById: (id) => {
    const user = users.find(u => u.id === id);
    return user;
  },

  updateUser: (id, updatedUser) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      return users[index];
    }
    return null;
  },

  deleteUser: (id) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      const deletedUser = users.splice(index, 1)[0];
      return deletedUser;
    }
    return null;
  },
};

export default userModel;
