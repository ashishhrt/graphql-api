const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechniqueSchema = new Schema({
    id: {type: String, unique: true},
    name: String,
    isActive: Boolean
});

module.exports = mongoose.model('Technique', TechniqueSchema);