/**
 * Created by Assaf on 5/14/2016.
 */
var P = require('autoresolve');
var Sequelize = require('sequelize');
var sequelize = require(P('src/orm/sequelize.js'));

console.log(sequelize);
var Users = sequelize.define('users', {
  userName: {
    type: Sequelize.STRING,
    field: 'username' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  displayName: {
    type: Sequelize.STRING,
    field: 'display_name'
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  token: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

module.exports = {
  registerUser: function (userName, displayName, password) {
    return Users.findOne({where: {userName: userName}}).then(function (user) {
      if (user === null) {
        return Users.create({
          userName: userName,
          displayName: displayName,
          password: password,
          token: Math.floor(Math.random() * 10000), //TODO change to a real token
          role: 'editor'
        });
      } else {
        return {error: 'User name is already taken'};
      }
    });
  },
  login: function (userName, password) {
    return Users.findOne({where: {userName: userName}}).then(function (user){
      return (user === null || user.password != password) ? {error: 'no user was found'} :
      {
        id: 1, //sessionId disabled for now
        user: {
          id: user.token,
          role: user.role
        }
      };
    });
  }
};