var Game = require('../models/gameModel.js');
var mongoose = require('mongoose');
var db = require('../db.js')

var gameController = {
// curl -H "Content-Type: application/json" -X POST -d '{"name": "Ray's game", "gameId": "0", "players": "[]", "currentQuestion": "null", "round": "0", "dealer": "null"}' http://localhost:3000/addGame
// '{"name": "Ray's game", "gameId": "0", "players": "[]", "currentQuestion": "null", "round": "0", "dealer": "null"}'
createGame: function(req, res) {
  var name = req.body.name;
  var gameId = req.body.gameId;
  var players = req.body.players || [];
  var dealer = req.body.dealer || 'null';
  var currentQuestion = req.body.currentQuestion || 'null';
  var answer = req.body.answer || 'null';
  var invited = req.body.invited || [];

  Game.findOne({ gameId: gameId })
    .exec(function(err, game) {
      if (!game) {
        var newGame = new Game({
          name: name,
          gameId: gameId,
          players: players,
          dealer: dealer,
          currentQuestion: currentQuestion,
          answer: answer,
          round: 0,
          invited: invited,
          isComplete: false
        });
        newGame.save(function(err, newGame) {
          if (err) {
            console.log(err)
            res.send(500, err);
          }
          res.json(newGame)
          res.end()
        });
      } else {
        console.log('Game already exists');
        res.end();
      }
    });
  },

  listGames: function(req, res) {
    Game.find({}, function(err, data) {
      if (!err) { 
          res.send(200, data);
      } 
      else {
        throw err;
      }
    });
  }

};

module.exports = gameController;