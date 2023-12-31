import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next)=>{
    // 1. read the token 
    const token = req.headers["authorization"];
    
    // 2. if no token return the error 
    if(!token)
    {
        return res.status(401).send("Unauthorized");
    }

    try{
        // 3. check if token is valid 
        const payload = jwt.verify(token,"p9nFyMt36ffIZmym1CXPlSIlN6Hacg7Q");

        console.log(payload);
    }
    catch(err)
    {
        // 4. return error 
        return res.status(401).send("Unauthorized");
    }

    // 5. call next middleware 
    next();

}

export default jwtAuth;