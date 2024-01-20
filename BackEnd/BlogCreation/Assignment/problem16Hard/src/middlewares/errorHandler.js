// Please don't change the pre-written code
// Import the necessary modules here

export class customErrorHandler extends Error {
  // Write your code here
  constructor(code,message)
  {
      super(message);
      this.code = code;
      
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  // Write your code here
  // console.log(err);
  console.log(err.code,err.message);
  if(err instanceof customErrorHandler)
  {
    res.status(err.code).send(err.message);
  }
  else{

    res.status(500).send("Something went wrong! Please try again later");
  } 
};


// export class ApplicationError extends Error{
//   constructor(message,code)
//   {
//       super(message);
//       this.code = code;
      
//   }
// }