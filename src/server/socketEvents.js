const todoModel = require('./models/todoModel')  //todo model

exports = module.exports = function(io) {
  const connections = [];
  io.on("connection", function(socket) {
    console.log("Connected to Socket!!" + socket.id);
    connections.push(socket);
    socket.on("disconnect", function() {
      console.log("Disconnected - " + socket.id);
    });

    var cursor = todoModel.find(
      {},
      "-_id itemId item completed",
      (err, result) => {
        if (err) {
          console.log("---Gethyl GET failed!!");
        } else {
          socket.emit("initialList", result);
          console.log("+++Gethyl GET worked!!");
        }
      }
    );
    //    .cursor()
    // cursor.on('data',(res)=> {socket.emit('initialList',res)})

    socket.on("addItem", addData => {
      var todoItem = new todoModel({
        itemId: addData.id,
        item: addData.item,
        completed: addData.completed
      });

      todoItem.save((err, result) => {
        if (err) {
          console.log("---Gethyl ADD NEW ITEM failed!! " + err);
        } else {
          // connections.forEach((currentConnection)=>{
          //  currentConnection.emit('itemAdded',addData)
          // })
          io.emit("itemAdded", addData);

          console.log({ message: "+++Gethyl ADD NEW ITEM worked!!" });
        }
      });
    });

    socket.on("markItem", markedItem => {
      var condition = { itemId: markedItem.id },
        updateValue = { completed: markedItem.completed };

      todoModel.update(condition, updateValue, (err, result) => {
        if (err) {
          console.log("---Gethyl MARK COMPLETE failed!! " + err);
        } else {
          // connections.forEach((currentConnection)=>{
          //  currentConnection.emit('itemMarked',markedItem)
          // })
          io.emit("itemMarked", markedItem);

          console.log({ message: "+++Gethyl MARK COMPLETE worked!!" });
        }
      });
    });
  });
};
