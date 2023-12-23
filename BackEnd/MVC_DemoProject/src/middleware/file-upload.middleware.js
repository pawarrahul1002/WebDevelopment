import multer from 'multer';
let count = 0;
const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
    console.log("uploaded ",count++);
  },
  filename: (req, file, cb) => {
    const name =
      Date.now() + '-' + file.originalname;
    cb(null, name);
  },
});

export const uploadFile = multer({
  storage: storageConfig,
});


// export const uploadFile =  multer({storage:storageconfig});
