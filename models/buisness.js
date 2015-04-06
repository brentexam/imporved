// db link
var mongoose = require('mongoose');

// define the product model (fields and data types)
var BuisnessSchema = new mongoose.Schema({
    company: String,
    category: String,
    number: String
});

// make the model public so other files can access it
module.exports = mongoose.model('Buisness', BuisnessSchema);