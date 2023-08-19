const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
const app = express();
const env = require('./config/environment');
const logger = require('morgan');
const port = 8000;

// used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passPortJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');
const sassMiddleware = require('sass-middleware');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);

chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

// app.use(sassMiddleware({
//     src:'./assets/scss',
//     dest:'./assets/css',
//     debug:true,
//     outputStyle:'extended',
//     prefix:'/css'
// }));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(env.asset_path));
app.use('/upload',express.static(__dirname+'/upload'));
app.use(logger(env.morgan.mode,env.morgan.options));
console.log('env mode',env.name);

app.set('view engine','ejs');
app.set('views','./views');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//mongo store is used to store session-cookies in the db
app.use(session({
    name:'codeial',
    // todo change the secret before deployment in production mode
    secret:env.session_cookie_key,
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb://127.0.0.1:27017/codeial_development',
            autoRemove:'disabled'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticateUser);
app.use(flash());
app.use(customMWare.setFlash);

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log("error",err);
    }
    console.log("Server is running on port",port);
})