var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
var body_parser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');

app.use(body_parser.json());
app.get('/', function (req, res, next) {
    res.send('Todod api Found');
});
app.get('/todos', function (req, res, next) {
    var queryparams = req.query;
    var where = {};
    if (queryparams.hasOwnProperty('completed') && queryparams.completed === 'true') {
        where.completed = true;
    }
    else if (queryparams.hasOwnProperty('completed') && queryparams.completed === 'false') {
        where.completed = false;
    }
    if (queryparams.hasOwnProperty('q') && queryparams.q.length > 0) {
        where.description = {
            $like: '%' + queryparams.q + '%'
        }
    }
    db.todo.findAll({where: where}).then(function (todos) {
        res.json(todos)
    }, function (e) {
        res.status(500).send();
    })
    // // if(queryparams.completed==='true')
    // // {
    // //  console.log(queryparams);
    // // }
    // var filteredTodos = todos;
    // if (queryparams.hasOwnProperty('completed') && queryparams.completed === 'true') {
    //     filteredTodos = _.where(filteredTodos, {completed: true});
    //     // res.json(filteredTodos);
    // }
    // else if (queryparams.hasOwnProperty('completed') && queryparams.completed === 'false') {
    //     filteredTodos = _.where(filteredTodos, {completed: false});
    //     //res.json(filteredTodos);
    // }
    //
    // if (queryparams.hasOwnProperty('q') && queryparams.q.length > 0) {
    //
    //     filteredTodos = _.filter(filteredTodos, function (todo) {
    //         return todo.description.toLocaleLowerCase().indexOf(queryparams.q.toLowerCase()) > -1;
    //     });
    //
    // }
    // res.json(filteredTodos);
})

app.get('/todos/:id', function (req, res, next) {
    var todoid = parseInt(req.params.id, 10);
    db.todo.findById(todoid).then(function (todo) {
        if (!!todo) {
            //console.log(todo)
            res.json(todo.toJSON());
        }
        else {
            res.status(404).send();
        }
    }, function (e) {
        res.status(500).send();
    })
    // var matchedtodo = _.findWhere(todos, {id: todoid});
    // if (matchedtodo) {
    //     res.json(matchedtodo);
    // }
    // else {
    //     res.status(404).send();
    // }
    // // res.send('Asking for todo Id'+ req.params.id);

});


//Post/todos/:id
app.post('/todos', function (req, res) {
    var body = _.pick(req.body, 'description', 'completed');

    db.todo.create(body).then(function (todo) {
        res.json(todo.toJSON())

    }, function (e) {
        res.status(400).json(e);
    })
    // if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
    //     return res.status(404).send();
    // }
    // body.id = todoNextId++;
    // todos.push(body);
    // //  console.log('description'+body.description);
    // res.json(body);

});
//Delete Ids from the array
app.delete('/todos/:id', function (req, res, next) {
    var todoid = parseInt(req.params.id, 10);
    db.todo.destroy({where:{
        id:todoid
    }}).then(function (rowsDeleted) {
        if(rowsDeleted===0)
        {
            res.status(404).json({
                error:'No todo Id'
            })
        }
        else {
            res.status(204).send();
        }

    },function () {
        res.status(500).send();
    })
    // var matchedtodo = _.findWhere(todos, {id: todoid});
    //
    // // res.send('Asking for todo Id'+ req.params.id);
    // if (matchedtodo) {
    //     todos = _.without(todos, matchedtodo);
    //     res.json(matchedtodo);
    // }
    // else {
    //     res.status(404).send();
    // }

});


// PUT /todos/:id  Update the Ids
app.put('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};

    if (!matchedTodo) {
        return res.status(404).send();
    }

    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(400).send();
    }

    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(400).send();
    }

    _.extend(matchedTodo, validAttributes);
    res.json(matchedTodo);
});
db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log('Express Listning on Port ' + PORT + '!');
    });
})

