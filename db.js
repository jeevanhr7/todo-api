/**
 * Created by jeevan on 4/21/2016.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/basic-sqlite-database.sqlite'
});

var db={};
db.todo=sequelize.import(__dirname+'/models/todo.js');
db.sequelize=sequelize;
db.Sequelize=Sequelize;


module.exports=db;