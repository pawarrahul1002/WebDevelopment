import userModel from "../model/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      next("please provide name");
      //   return res
      //     .status(400)
      //     .send({ success: false, message: "please provide name" });
    }
    if (!email) {
      next("please provide email");
      //   return res
      //     .status(400)
      //     .send({ success: false, message: "please provide email" });
    }
    if (!password) {
      next("please provide password");
      //   return res
      //     .status(400)
      //     .send({ success: false, message: "please provide password" });
    }

    const existingUser = await userModel.findOne({ email });

    console.log(existingUser);
    if (existingUser) {
      console.log("Email is already registered please login");
      next("Email is already registered please login");
        // return res
        //   .status(200)
        //   .send({
        //     success: false,
        //     message: "Email is already registered please login",
        //   });
    } else 
    {
      const user = await userModel.create({ name, email, password });
      const token = user.createJWT();
      
      res.status(201).send({
        success: true,
        message: "user created successfullly",
        user: {
          name:user.name,
          email:user.email,
          location: user.location,
          createdAt:user.createdAt,
          updatedAt:user.updatedAt
        },
        token:token
      });
    }
  } catch (error) {
    next(error);
    // console.timeLog(error);
    // res.status(400).send({
    //   message: "Error in register controller",
    //   success: false,
    //   error: error.message,
    // });
  }
};


export const loginController = async (req,res,next)=>{
 try{
  const {email,password} = req.body;
  if(!email || !password)
  {
    next("please provide all the data");
  }
  const user = await userModel.findOne({email});
  if(!user)
  {
    next("Invalid username or password");
  }

  const isMatch = await user.comparePassword(password);
  if(!isMatch)
  {
    next("Invalid username or password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "user created successfullly",
    user: {
      name:user.name,
      email:user.email,
      location: user.location,
    },
    token:token
  })
 }catch(error)
 {
    next(error)
 }
}