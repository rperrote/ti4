//const todoModel = require('./models/todoModel')  //todo model
const GameModel = require('./models/gameModel')
const UserModel = require('./models/userModel')
const PlayerModel = require('./models/playerModel')
const BattleModel = require('./models/battleModel')

const mongoose = require('mongoose');

exports = module.exports = function(io) {
  const connections = [];
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
      GameModel.find({}).
      populate('players'). // only return the Persons name
      exec(function(err, games) {
        if( err ){
          console.log("---Gethyllist games failed!! " + err);
          return;
        }else{
          io.to(socket.id).emit('listGames', games);
        }
      });
    });

    socket.on("createGame", () => {
      //TODO id asignment 
      var userId = connectionPlayers[socket.id];
      
      var gameModel = new GameModel({ owner: userId });
      
      gameModel.save((err, result) => {
        if (err) {
          console.log("---Gethy create game failed!! " + err);
          return;
        } else {
          console.log({ message: "Created new game with id: " + result.id });
          
          var response = {};
          response.gameId = gameModel.id;
          
          io.emit('gameCreated', response);
          
          /******* join game ********/
          joinUser(userId, result.id, playerConnections, io, true);
          /******* join game finish ********/
        }
      });
    });
    
    socket.on("joinGame", (gameId) => {
      
      console.log("join game game ID " + gameId);
      
      var userId = connectionPlayers[socket.id];
      
      /*******  user mode Start *******/  
    
      joinUser(userId, gameId, playerConnections, io);
      
      /*******  user mode finish *******/  
    });
    
// SINGLE GAME
    
    socket.on("claimUser", user => {
      
      var userDb = null;
      
      /****** star user model get user ********/
      UserModel.find(
        {name: user.name},
        // "-_id itemId item completed",
        (err, result) => {
          if (err) {
            console.log("--claim user - GET USER failed!!");
            return;
          } else {
            userDb = result[0];
            
            var player = {};
            if( userDb != null ){
              player = userDb;
              
              playerConnections[player.id] = socket.id;
              connectionPlayers[socket.id] = player.id;
              
              io.to(socket.id).emit('claimUser', player);
              
              /****** star game model get games********/
              GameModel.find({}).
              populate('players'). // only return the Persons name
              exec(function(err, games) {
                if( err ){
                  console.log("---claim user - get games " + err);
                  return;
                }else{
                  io.to(socket.id).emit('listGames', games);
                }
              });
              /****** star game model get games finish********/
              
              return;
            }else{
              player = {};
              player.id = playerId;
              playerId = playerId++;
              player.name = user.name;
              
              var userModel = new UserModel({ id: player.id, name: user.name });
              
              console.log("user claim " + user.name);
              playerConnections[player.id] = socket.id;
              connectionPlayers[socket.id] = player.id;
            
              /****** star user model save user********/
              userModel.save((err, result) => {
                if (err) {
                  console.log("---claim user -  SAVE USER failed!! " + err);
                  return;
                } else {
                  io.to(socket.id).emit('claimUser', player);
                  
                  /****** star game model get games********/
                  GameModel.find({}, function(err, games) {
                    if( err ){
                      return;
                    }else{
                      io.to(socket.id).emit('listGames', games);
                    }
                  });
                  /****** star game model get games finish********/
                }
              });
               /****** star user model save user finish ********/
            }
          }
        }
      );
      
      /****** star user model get user finish********/
      
    });
    
    socket.on("chooseRace", request => {
      var userId = connectionPlayers[socket.id];
      
      // get player with owner userId, and gameId as gameId
      /************ find player  start  *************/
      PlayerModel.findOne(
         { gameId: request.gameId, owner: userId },
          (err, playerDb) => {
            if (err) {
              console.log("---Choose race get player " + err);
              return;
            } else {
              
              /************ update player start  *************/
         
              PlayerModel.update(
                { gameId: request.gameId, owner: userId },
                { $Set:{ "race": request.raceId } },
                function (err, raw) {
                  if (err){
                    console.log("---Gethyl update player race failed!!" + err);
                    return;
                  }else{
                    //send change race
                    
                    /*********** start broadcast ***********/
                     GameModel.findOne({id: request.gameId}).
                      populate('players'). // only return the Persons name
                      exec(function(err, game) {
                        if( err ){
                          console.log("---Gethyl GET GAMES failed!! " + err);
                          return;
                        }else{
                          console.log("send list games");
                          
                          var response = {};
                          response.gameId = request.gameId;
                          response.userId = userId;
                          response.race = request.raceId;
                          
                          broadcastToGame(game, userId, 'userJoined', response, playerConnections, io);
                        }
                      });
                       /*********** start broadcast finish  ***********/
                  }
                });
            }
      });
    });
    
    socket.on("chooseTechnology", request => {
      
      var userId = connectionPlayers[socket.id];
      
      // get player with owner userId, and gameId as gameId
      /************ find player  start  *************/
      PlayerModel.findOne(
         { gameId: request.gameId, owner: userId },
          (err, playerDb) => {
            if (err) {
              console.log("---Choose race get player " + err);
              return;
            } else {
              
              /************ update player start  *************/
         
              PlayerModel.update(
                { gameId: request.gameId, owner: userId },
                { $addToSet:{ "tecnologies": request.technoId } },
                function (err, raw) {
                  if (err){
                    console.log("---Gethyl update player race failed!!" + err);
                    return;
                  }else{
                    //send change race
                    
                    /*********** start broadcast ***********/
                     GameModel.findOne({id: request.gameId}).
                      populate('players'). // only return the Persons name
                      exec(function(err, game) {
                        if( err ){
                          console.log("---Gethyl GET GAMES failed!! " + err);
                          return;
                        }else{
                          console.log("send list games");
                          
                          var response = {};
                          response.gameId = request.gameId;
                          response.userId = userId;
                          response.technoId = request.technoId;
                          
                          broadcastToGame(game, userId, 'userTechnology', response, playerConnections, io);
                        }
                      });
                      /*********** start broadcast finish  ***********/
                  }
                });
            }
      });
      
    });
    
    socket.on("attackOn", request => {
      
      // find player attacker
      // find player defender
      
      //create battle and save
      //update attacker and defender
      
      var attackerId = connectionPlayers[socket.id];
      
      /******** find player attacker start ***********/
      
      PlayerModel.findOne(
         { gameId: request.gameId, owner: attackerId },
          (err, attacker) => {
            if (err) {
              console.log("---AttackOn get attacker player Failed " + err);
              return;
            } else {
            
              /******** find player defender start ***********/
              PlayerModel.findOne(
                 { gameId: request.gameId, owner: request.defenderId},
                  (err, defender) => {
                    if (err) {
                      console.log("---AttackOn get attacker player Failed " + err);
                      return;
                    } else {
                      
                      // create battle
                      var battleModel = new BattleModel({ attackerId: attackerId, defenderId: request.defenderId });
                      
                      battleModel.save((err, result) => {
                        if (err) {
                          console.log("create battle failed!! " + err);
                          return;
                        } else {
                          
                          var battle = {};
                          battle.attackerId = attackerId;
                          battle.defenderId = request.defenderId;
                          battle.id = battleModel.id;
                          
                          /******update player with battle*******/
                          PlayerModel.update(
                            { gameId: request.gameId, owner: attackerId },
                            { $addToSet:{ "battles":  battleModel._id } },
                            function (err, raw) {
                              if (err){
                                console.log("--- add battle to attacker failed!!" + err);
                                return;
                              }else{
                                var socketId = playerConnections[attackerId];
                                io.to(socketId).emit('attackStarted', battle);
                              }
                            });
                          /******update player with battle finish *******/
                          
                          /******update player with battle*******/
                          PlayerModel.update(
                            { gameId: request.gameId, owner: attackerId },
                            { $addToSet:{ "battles":  battleModel._id } },
                            function (err, raw) {
                              if (err){
                                console.log("---add battle to defender failed!!" + err);
                                return;
                              }else{
                                 var socketId = playerConnections[request.defenderId];
                                 io.to(socketId).emit('attackStarted', battle);
                              }
                            });
                          /******update player with battle finish *******/
                        }
                      });
                    }
              });
              /******** find player defender finish ***********/
            }
      });
     
     /******** find player attacker finish ***********/
     
    });
    
    socket.on("finishBattle", request => {
      // find last battle, o me pasa el battle id, tiene que tener el battle id
      // set battle finish.
      
      BattleModel.findOne(
       { id: request.battleId },
        (err, battle) => {
          if (err) {
            console.log("---finish battle - Get battle Failed " + err);
            return;
          } else {
            BattleModel.update(
              { id: request.battleId },
              { $set: {finish: true} },
              (err, result) => {
                if (err) {
                  console.log("---finish battle - update battle Failed " + err);
                  return;
                } else {
                  var defenderSocketId = playerConnections[battle.defenderId];
                  io.to(defenderSocketId).emit('battleFinished', battle);
                  var attackerSocketId = playerConnections[battle.attackerId];
                  io.to(attackerSocketId).emit('battleFinished', battle);
                } 
              }
            );
          }
        }
      );
      
    });
    
    socket.on("addModifier", markedItem => {
      
    });
    
    socket.on("gameFinish", markedItem => {
      
    });
    
  });
};

function broadcastToGame(game, myId,  event, body, playerConnections, io){
  game.players.forEach(player => {
    var socketId = playerConnections[player.owner];
    console.log("send broadcast " + player.owner);
    //TODO check body
     io.to(socketId).emit(event, body);
  })
}

function joinUser(userId, gameId, playerConnections, io, skipSendList){
  var playerDb = null;
  var gameDb = null;
  
  console.log("finding user by id " + userId);
  
  UserModel.findOne(
    { id: userId },
    (err, userDb) => {
      if (err) {
        console.log("---Gethyl GET failed!!" + err);
        return;
      } else {
        console.log( "  user get by user Id ");
        
        console.log(userDb);
    
        /*******  gameModel playsers Start *******/
        PlayerModel.findOne(
         { gameId: gameId, owner: userId },
          (err, result) => {
            if (err) {
              console.log("---Gethyl GET failed!!" + err);
              return;
            } else {
              playerDb = result;
              console.log(" get player by game id y owner ");
              
              if( playerDb != null ){
                GameModel.findOne({id: gameId}).
                populate('players'). // only return the Persons name
                exec(function(err, game) {
                  if( err ){
                    console.log("---Gethyl GET GAMES failed!! " + err);
                    return;
                  }else{
                    var gamePlayer = {};
                    gamePlayer.name = userDb.name;
                    gamePlayer.owner = userDb.id;
                    var response = {};
                    response.gameId = gameId;
                    response.newPlayer = gamePlayer;
                    console.log( "dens player ");
                    console.log( game.players);
                    broadcastToGame(game, userId, 'userJoined', response, playerConnections, io);
                  }
                });
                return;
              }
                    
              var gamePlayer = {};
              gamePlayer.name = userDb.name;
              gamePlayer.owner = userDb.id;

              /******* create new player ********/
              
              var playerModel = new PlayerModel({
                  owner: userDb.id,
                  name: userDb.name,
                  gameId: gameId
              });
              
              playerModel.save((err, result) => {
                if (err) {
                  console.log("---Gethyl create player failed!! " + err);
                  return;
                } else {
                  
                  var response = {};
                  response.gameId = gameId;
                  response.newPlayer = gamePlayer;
                  
                  GameModel.update(
                  { id: gameId },
                  { $addToSet:{ "players": playerModel._id } },
                  function (err, raw) {
                    if (err){
                      console.log("---Gethyl update player race failed!!" + err);
                      return;
                    }else{
                      
                      if( skipSendList ){
                        return;
                      }
                      
                      GameModel.findOne({id: gameId}).
                      populate('players'). // only return the Persons name
                      exec(function(err, game) {
                        if( err ){
                          console.log("---Gethyl GET GAMES failed!! " + err);
                          return;
                        }else{
                          console.log("send list games");
                          broadcastToGame(game, userId, 'userJoined', response, playerConnections, io);
                        }
                      });
                      
                    }
                  });

            }
          }
        );
        
        /*******  gameModel playsers finish *******/
    
        }
      }
    );
      }
    });
}