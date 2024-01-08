// Please don't change the pre-written code
// Import the necessary modules here
import  Jwt  from "jsonwebtoken";
import { parse } from 'cookie';
const jwtAuth = (req, res, next) => {
  // Write your code here    // 1. read the token 
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.jwtToken;
    // 2. if no token return the error 
    if(!token)
    {
        return res.status(401).json({ "success": "false", "msg": {"name":"JsonWebTokenError","message":"jwt must be provided"} });
    }

    try{
        // 3. check if token is valid 
        const payload = Jwt.verify(token,"p9nFyMt36ffIZmym1CXPlSIlN6Hacg7Q");

        console.log(payload);
    }
    catch(err)
    {
        // 4. return error 
        return res.status(401).send("Unauthorized");
    }

    // 5. call next middleware 
    next();

};

export default jwtAuth;
