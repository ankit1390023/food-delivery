import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    foodName: String,
    price: String,
    img_path: String,
    description: String,
    quatity: Number,
    resto_id: String,
    user_id: String
});

// Check if the Food model is already defined
let Cart;
if (mongoose.models.Cart) {
    // If already defined, assign it to Food
    Cart = mongoose.model('Cart');
} else {
    // If not defined, create the model
    Cart = mongoose.model('Cart', cartSchema);
}

export default Cart;
