
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    email: String,
    password: String,
    name: String,
    city: String,
    address: String,
    contact: String,

});

// Check if the User model has already been defined
let User;
if (mongoose.models.User) {
    User = mongoose.model("User");
} else {
    User = mongoose.model("User", userSchema);
}

export default User;