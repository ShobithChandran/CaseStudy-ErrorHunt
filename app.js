const express = require('express'); 
const path = require ('path'); 
const bodyparser = require('body-parser'); //part #1 point 2
const cors = require('cors');
const host = '0.0.0.0';
const port = process.env.PORT || 5000;

const nav= [
    {
        link:"/books", title:"Books"},
    {
        link:"/authors",title:"Authors"},
    {
        link:"/addbook",title:"Add Book"},
    {
        link:"/addauthor",title:"Add Author"},
]; //Part #2 Point 6

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter'); //part #1 point 3
const booksRouter = require('./src/routes/booksroute');
const authorsRouter = require('./src/routes/authorsroute');
// const bodyParser = require('body-parser');

const app = new express; 

app.set('views','./src/views'); 
app.set('view engine','ejs');
app.use(cors()); //Part #2 Point 7
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

//Setting the path for the static files
app.use(express.static(path.join(__dirname , '/public'))); 

//Requesting for /books, using booksRouter
app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 

 
app.get('/',function(req,res){

    res.render('index',{});
    
});

app.listen(port, host, function() {
    console.log("Server ready on port number 5000"); //Part #1 Point 5
  });