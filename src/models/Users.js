const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    role: String,
    photo: String
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;
