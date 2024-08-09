
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    email: String,
    password: String,
    restaurantName: String,
    city: String,
    address: String,
    contactNumber: String,

});

// Check if the Restaurant model has already been defined
let Restaurant;
if (mongoose.models.Restaurant) {
    Restaurant = mongoose.model("Restaurant");
} else {
    Restaurant = mongoose.model("Restaurant", restaurantSchema);
}

export default Restaurant;