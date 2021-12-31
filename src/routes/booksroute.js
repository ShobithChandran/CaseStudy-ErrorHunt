const express = require('express'); 
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require('../model/BookModel');
// var MongoClient = require('mongodb').MongoClient;




//router to render books page
booksRouter.get('/',function(req,res){

    bookdata.find() 
    .then(function (books) {

    res.render('books',{
        books
    });

    })
})



//router to render addbook page
booksRouter.get('/addbook',function(req,res){
    res.render('addbook',{});

});




//router to add book
booksRouter.post('/add', function (req, res) {

        var item={
            title:req.body.title,
            author:req.body.author,
            image:req.body.image,
            about:req.body.about
        }
        console.log(item)  ;
        const book = new bookdata(item);
        book.save();
        res.redirect('/books');

    })



//router for singlebook
booksRouter.get('/:id',function(req,res){
    const id = req.params.id;
    bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render('book', {
                    book
                })

            })
    
});




//router to delete book
booksRouter.post('/delete', function (req, res) { //Part #2 Point 9

    const id = req.body.id;  

    bookdata.deleteOne({ _id: id })
        .then(function () {

            res.redirect('/books')

        })  
})

// MongoClient.connect('/delete', function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("myFirstDatabase");
//     const id = req.body.id;  
//     dbo.collection("bookdata").deleteOne(myquery, function(err, obj) {
//       if (err) throw err;
//       console.log("1 document deleted");
//       db.close();
//     });
//   });



//router to edit book
booksRouter.post('/edit', function (req, res) {

    bookdata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editbook', {data})
        }
    })
})



//router to update book
booksRouter.post('/update', function (req, res) { //Part #2 Point 9

    bookdata.findByIdAndUpdate(req.body.id, { $set: req.body }, function (err, data) {
        if (err) {
            res.json({ status: "Failed" });
        }
        else if (data.n == 0) {
            res.json({ status: "No match Found" });
        }
        else {
            res.redirect("/books");
        }

    }) 
})







module.exports = booksRouter;