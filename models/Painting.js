const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * NOTE: There is no ID. That's because mongoose
 * will assign an ID by default to all schemas
 */

 const PaintingSchema = new Schema({
     name: String,
     url: String,
     techniques: [String]
 });

 module.exports = mongoose.model('Painting', PaintingSchema);