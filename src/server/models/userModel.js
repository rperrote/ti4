const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    id: Number,
    name: String
});

// autoincrement plugin is used to increment the itemId
userSchema.plugin(autoIncrement.plugin, { model: 'UserModel', field: 'id' }); 
// we need to create a model using it
module.exports = mongoose.model('UserModel', userSchema);