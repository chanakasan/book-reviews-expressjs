var express = require('express');
var app = express();
var mongoose = require('mongoose');

/**
 * Database connection
 */
mongoose.connect('mongodb://localhost:27017/book-reviews');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/**
 * Serve static files from public/
 */
app.use(express.static('public'));

/**
 * app routes
 */
app.get('/new', function(request, response) {
    var book1 = new Book({ name: 'Treasure Island' });
    var hostname = request.headers.host;
    var baseUrl = "http://"+hostname;
    
    book1.save(function (err) {
        if (err) console.log(err);
    });

    var result = {
        homepage: baseUrl+"/",
        message: "The book " + book1.name + " has been saved!"
    }

    response.json(result);
})

app.get('/clear', function(request, response) {
    var hostname = request.headers.host;
    var baseUrl = "http://"+hostname;

    Book.remove(true, function (err) {
        if (err) return console.error(err);
    })

    var result = {
        homepage: baseUrl+"/",
        message: "All books were removed!"
    }

    response.json(result);
})

/**
 * REST API
 */
app.get('/books', function(request, response) {
    Book.find(function (err, books) {
        if (err) return console.error(err);

        var data = [];
        for (var i=0; i< books.length; i++) {
            data[i] = books[i].name;
        }

        response.json(data)
    })
})

/**
 * Models
 */
var bookSchema = mongoose.Schema({
    name: String
})

var Book = mongoose.model('Book', bookSchema);

/**
 * Server
 */
app.listen(3000, function() {
    console.log("Listening on port 3000");
})
