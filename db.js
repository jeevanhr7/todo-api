/**
 * Created by jeevan on 4/21/2016.
 */
var Sequelize = require('sequelize');
var env=process.env.NODE_ENV||'development';
if(env=='production')
{
    sequelize=new Sequelize(process.env.DATABASE_URL,{
        dialect:'postgres'
    });
}else {
     sequelize = new Sequelize(undefined, undefined, undefined, {
        'dialect': 'sqlite',
        'storage': __dirname + '/data/basic-sqlite-database.sqlite'
    });
}


var db={};
db.todo=sequelize.import(__dirname+'/models/todo.js');
db.sequelize=sequelize;
db.Sequelize=Sequelize;


module.exports=db;