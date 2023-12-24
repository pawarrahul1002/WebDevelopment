// // Please don't change the pre-written code
// // Import the necessary modules here
// import multer from "multer";

// // Write your code here
// const storageConfig = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"public/images/");

//     },
//     filename:(req,file,cb)=>{
//         const name = Date.now()+"-"+file.originalname;
//         cb(null,name);
//     },
// });

// export default imageUpload = multer({storage:storageConfig});


import multer from 'multer';
let count = 0;
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
    console.log("uploaded ",count++);
  },
  filename: (req, file, cb) => {
    const name =
      Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

export const imageUpload = multer({
  storage: storageConfig,
});

