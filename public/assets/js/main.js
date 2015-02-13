$.getJSON('/books', function(data) {
    var books = [];
    $.each(data, function(key, val) {
       books.push("<li id='"+key+"'>"+val+"</li>");
    })

    $('ul.books-list').append(books.join(''));
})
