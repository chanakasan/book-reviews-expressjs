var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/new', function(request, response) {
   response.json("New Review");
})

app.listen(3000, function() {
    console.log("Listening on port 3000");
})
