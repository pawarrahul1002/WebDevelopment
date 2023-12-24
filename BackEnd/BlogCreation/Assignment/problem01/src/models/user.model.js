// Please don't change the pre-written code
// Import the necessary modules here

export const users = [
  { id: 1, name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" },
];

export const registerUser = (user) => {
  // Write your code here
  const newUser = {id:users.length+1, name:  user.name, email:user.email,password:user.password};

  users.push(newUser);
  // console.log(users);
};

export const authenticateUser = (reqUser) => {
  // Write your code here
  if(users.length==0)
  {
    return false;
  }

  const result = users.find((u)=>(u.email==reqUser.email_ && u.password==reqUser.pass_));
  return result;
};

