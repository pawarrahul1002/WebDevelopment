const mongoose = require("mongoose");

exports.connectMongoose = async () => {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/PassportDemo")
    .then((e) => {
      console.log(`connected to mongoDB: ${e.connection.host}`);
    })
    .catch((e) => console.log(e));
};

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});


exports.User = mongoose.model("User", userSchema);