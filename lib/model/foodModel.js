import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    foodName: String,
    price: String,
    img_path: String,
    description: String,
    resto_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant' // Assuming resto_id references the Restaurant model
    }
});

// Check if the Food model is already defined
let Food;
if (mongoose.models.Food) {
    // If already defined, assign it to Food
    Food = mongoose.model('Food');
} else {
    // If not defined, create the model
    Food = mongoose.model('Food', foodSchema);
}

export default Food;
