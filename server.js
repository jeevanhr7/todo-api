/**
 * Created by Chethan H R on 01-Apr-16.
 */
var express=require('express');
var app=express();
var PORT=process.env.PORT||3000;
app.get('/',function(req,res,next){
    res.send('Todod api Found');
})
app.listen(PORT,function(){
    console.log('Express Listning on Port '+PORT+'!');
})