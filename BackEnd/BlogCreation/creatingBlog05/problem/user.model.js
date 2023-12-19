export const users = [
  {
    name: "coding ninjas",
    email: "ninja@gmail.com",
    image: "https://entrackr.com/storage/2022/10/Coding-Ninjas.jpg",
  },
];

export const updateUsers = (user) => {
  users[0].name = user.name;
  users[0].email = user.email;
  users[0].image = user.image;

  // users.push(user);
};
