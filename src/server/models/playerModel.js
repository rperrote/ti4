const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const BattleModel = require('./battleModel')

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    id: Number,
    gameId: Number,
    owner: Number,
    name: String,
    race: Number,
    tecnologies: [Number],
    battles: [{type: Schema.ObjectId, ref: 'BattleModel'}]
});

// autoincrement plugin is used to increment the itemId
userSchema.plugin(autoIncrement.plugin, { model: 'PlayerModel', field: 'id' }); 
// we need to create a model using it
module.exports = mongoose.model('PlayerModel', userSchema);