const mongoose = require('mongoose');

// Define the schema
const orderSchema = new mongoose.Schema({
    user_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    foodItemIds: { type: String, required: true },
    resto_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    deliveryBoy_Id: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, required: true },
    amount: { type: Number, required: true }
});

// Check if the Food model is already defined
let Order;
if (mongoose.models.Order) {
    // If already defined, assign it to Food
    Order = mongoose.model('Order');
} else {
    // If not defined, create the model
    Order = mongoose.model('Order', orderSchema);
}

export default Order;
