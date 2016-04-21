var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/basic-sqlite-database.sqlite'
});
var TODO = sequelize.define('todo', {
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 250]
        }

    },
    completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true

    }
})
sequelize.sync({force: true}).then(function () {
    console.log('Everythiing is Synced');
    TODO.create({
        description: 'Take this',
        completed: true
    }).then(function (todo) {
        return TODO.create({
            description: "clean offie trash"
        })

    }).then(function () {
        //return TODO.findById(1)
        return TODO.findAll({
            where: {
                description: {
                    $like: '%trash%'
                }
            }
        })
    }).then(function (todos) {
            if (todos) {
                todos.forEach(function (todo) {
                    console.log(todo.toJSON());
                })
            }
            else {
                console.log("No data found")
            }
        })
        .catch(function (e) {
            console.log(e);
        })
});
