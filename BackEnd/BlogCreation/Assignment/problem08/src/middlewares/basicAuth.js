// Please don't change the pre-written code
// Import the necessary modules here
import {getAllUsers} from "../features/user/model/user.model.js"
const basicAuthMiddleware = (req,res,next) => {
  // Write your code here

      // 1. Check if authorization header is empty.

      const authHeader = req.headers["authorization"];

      if(!authHeader){
          return  res.status(401).json({ status: "failure", msg: "invalid user details" })
      }
      console.log(authHeader);
      // 2. Extract credentials. [Basic qwertyusdfghj345678cvdfgh]
      const base64Credentials = authHeader.replace('Basic ','');
      console.log(base64Credentials);
      // 3. decode crdentials.
  
      const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf8')
      console.log(decodedCreds); // [username:password]
      const creds = decodedCreds.split(':');
  
      const user = getAllUsers().find(u=> u.email==creds[0] && u.password==creds[1]);
      if(user){
          next();
      }
      else{
          return  res.status(401).json({ status: "failure", msg: "invalid user details" })
      }
  
};

export default basicAuthMiddleware;
