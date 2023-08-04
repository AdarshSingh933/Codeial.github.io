const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app=express();

app.use(expressLayouts);
app.use(express.static('./assets'));

app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes'));
const port=8000;

app.listen(port,function(err){
    if(err){
        console.log("error",err);
    }
    console.log("Server is running on port",port);
})