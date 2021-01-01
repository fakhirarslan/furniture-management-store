const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    title: { type: String },
    quantity: { type: String },
    price: { type: String },
    image: { type: String },
});

module.exports = schema = mongoose.model('item', ItemSchema);
