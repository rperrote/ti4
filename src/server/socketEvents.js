//const todoModel = require('./models/todoModel')  //todo model
var Game = require('./models/game');
var Player = require('./models/player');

exports = module.exports = function(io) {
  const connections = [];
  const games = [];
  const players = [];
  const playerConnections = [];
  const connectionPlayers = [];
  var gameId = 0;
  var playerId = 0;
  var battleId = 0;
  
  io.on("connection", function(socket) {
    console.log("Connected to Socket!!" + socket.id);
    connections.push(socket);
    
    socket.on("disconnect", function() {
      console.log("Disconnected - " + socket.id);
    });

//GAMES
    socket.on("listGames", () => {
      io.emit('listGames', games);
    });

    socket.on("createGame", () => {
      //TODO id asignment 
      var game = new Game();
      game.id = gameId;
      gameId = gameId++;
      games[game.id] = game;
      io.emit('createGame', game);
    });
    
    socket.on("joinGame", (gameId) => {
      
      var userId = connectionPlayers[socket.id];
      
      var game = games[gameId];
      var player = players[userId];
      
      var gamePlayer = new Player();
      gamePlayer.name = player.name;
      
      game.players[gamePlayer.name] = gamePlayer;
      
      var response = {};
      response.gameId = gameId;
      response.userId = gamePlayer;
      
      // TODO join game body
      broadcastToGame(game, userId, 'userJoin', response, playerConnections);
    });
    
// SINGLE GAME
    
    socket.on("claimUser", name => {
      var player = new Player();
      player.id = playerId;
      playerId = playerId++;
      player[playerId] = player;
      player.name = name;
      playerConnections[playerId] = socket.id;
      connectionPlayers[socket.id] = playerId;
    });
    
    socket.on("chooseRace", (gameId, raceId) => {
      var userId = connectionPlayers[socket.id];
      var game = games[gameId];
      var player = game.players[userId];
      player.race = raceId;
      
      var response = {};
      response.gameId = gameId;
      response.userId = userId;
      response.race = raceId;
      
      broadcastToGame(game, userId, 'userRace', response, playerConnections);
    });
    
    socket.on("chooseTechnology", (gameId, technoId) => {
      var userId = connectionPlayers[socket.id];
      var game = games[gameId];
      var player = game.players[userId];
      
      if( !player.technologies.includes(technoId)){
        player.technologies.push(technoId);
      }
      
      var response = {};
      response.gameId = gameId;
      response.userId = userId;
      response.technoId = technoId;
      
      broadcastToGame(game, userId, 'chooseTecnology', response, playerConnections);
    });
    
    socket.on("attackOn", (gameId, defenderId) => {
      var attackerId = connectionPlayers[socket.id];
      var socketId = playerConnections[defenderId];
      
      var game = games[gameId];
      var attacker = game.players[attackerId];
      var defender = game.players[defenderId];
      
      var battle = {};
      battle.attackerId = attackerId;
      battle.defenderId = defenderId;
      attacker.battles.push(battle);
      defender.battles.push(battle);
      
      io.sockets.socket(socketId).emit('attackOn', battle);
      
    });
    
    socket.on("finishBattle", (gameId, battleId) => {
      var userId = connectionPlayers[socket.id];
      var game = games[gameId];
      var player = game.players[userId];
      var battle = player.battles[battleId];
      var otherId = userId == battle.attackerId ? battle.attackerId : battle.defenderId;
      var otherPlayer = game.players[otherId];
      var otherBattle = otherPlayer.battles[battleId];
      
      battle.finished = true;
      otherBattle.finished = true;
      
      io.sockets.socket( playerConnections[otherId]).emit('finishBattle', battleId);
    });
    
    socket.on("addModifier", markedItem => {
      
    });
    
    socket.on("gameFinish", markedItem => {
      
    });
    
  });
};

function broadcastToGame(game, myId,  event, body, playerConnections){
  game.players.forEach(player => {
    if( player.id == myId ){
      return;
    }
    var socketId = playerConnections[player.id];
    //TODO check body
     io.sockets.socket(socketId).emit(event, body);
  })
}



