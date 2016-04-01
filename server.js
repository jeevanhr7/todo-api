/**
 * Created by Chethan H R on 01-Apr-16.
 */
var express=require('express');
var app=express();
var PORT=process.env.PORT||3000;
var todos=[{
    id:1,
    descrption:'I need Job',
    completed:false
},
    {
        id:2,
        description:'going to Upload the Resume',
        completed:false
    },
    {
        id:3,
        description:'Third Data',
        completed:false
    }];

app.get('/',function(req,res,next){
    res.send('Todod api Found');
});
app.get('/todos',function(req,res,next){
   res.json(todos);
});


app.get('/todos/:id',function(req,res,next){
    var todoid=parseInt(req.params.id,10);
    var matchedtodo;
todos.forEach(function(todo){
    if(todoid===todo.id){
matchedtodo=todo;
    }
});
    if(matchedtodo)
    {
        res.json(matchedtodo);
    }
    else
    {
        res.status(404).send();
    }
   // res.send('Asking for todo Id'+ req.params.id);

});


app.listen(PORT,function(){
    console.log('Express Listning on Port '+PORT+'!');
});