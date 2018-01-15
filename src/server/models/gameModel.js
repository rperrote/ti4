const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const PlayerModel = require('./playerModel')

var Schema = mongoose.Schema;

// create a schema
var gameSchema = new Schema({
    id: Number,
    owner: Number,
    players: [{type: Schema.ObjectId, ref: 'PlayerModel'}]
});

// autoincrement plugin is used to increment the itemId
gameSchema.plugin(autoIncrement.plugin, { model: 'GameModel', field: 'id' }); 
// we need to create a model using it
module.exports = mongoose.model('GameModel', gameSchema);