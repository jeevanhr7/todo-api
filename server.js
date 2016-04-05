/**
 * Created by Chethan H R on 01-Apr-16.
 */
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;
var body_parser = require('body-parser');
var _ = require('underscore');


app.use(body_parser.json());
app.get('/', function (req, res, next) {
    res.send('Todod api Found');
});
app.get('/todos', function (req, res, next) {
    res.json(todos);
});


app.get('/todos/:id', function (req, res, next) {
    var todoid = parseInt(req.params.id, 10);
    var matchedtodo=_.findWhere(todos,{id:todoid});
    if (matchedtodo) {
        res.json(matchedtodo);
    }
    else {
        res.status(404).send();
    }
    // res.send('Asking for todo Id'+ req.params.id);

});


//Post/todos/:id
app.post('/todos', function (req, res) {
    var body = req.body;
if(!_.isBoolean(body.completed)|| !_.isString(body.description) ||body.description.trim().length===0){
    return res.status(404).send();
}
    body.id = todoNextId++;
    todos.push(body);
    //  console.log('description'+body.description);
    res.json(body);

});
//Delete Ids from the array
app.delete('/todos/:id', function (req, res, next) {
    var todoid = parseInt(req.params.id, 10);
    var matchedtodo=_.findWhere(todos,{id:todoid});

    // res.send('Asking for todo Id'+ req.params.id);
    if (matchedtodo) {
     todos=_.without(todos,matchedtodo);
        res.json(matchedtodo);
    }
    else {
        res.status(404).send();
    }

});



app.listen(PORT, function () {
    console.log('Express Listning on Port ' + PORT + '!');
});