const mongoose = require('mongoose');

// Define the schema
const deliveryPartnerSchema = new mongoose.Schema({

    del_name: String,
    email: String,
    password: String,
    city: String,
    address: String,

});

// Check if the DeliveryPartner model is already defined
let DeliveryPartner;
if (mongoose.models.DeliveryPartner) {
    // If already defined, assign it to DeliveryPartner
    DeliveryPartner = mongoose.model('DeliveryPartner');
} else {
    // If not defined, create the model
    DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);
}

export default DeliveryPartner;
