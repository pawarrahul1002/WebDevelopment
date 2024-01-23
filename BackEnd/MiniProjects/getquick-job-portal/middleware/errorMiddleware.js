const errorMiddleware = (err,req,res,next)=>{
    console.log("error====>",err);
    res.status(500).send({
        success:false,
        message:"something went wrong",
        err: err.message || err 
    });
    // next();
};

export default errorMiddleware;