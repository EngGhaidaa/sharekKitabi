// On Client and Server
//const BookSearch = new Mongo.Collection('booksearch'),
    BooksearchIndex = new EasySearch.Index({
        collection: Books,
        fields: ['title'],
        engine: new EasySearch.Minimongo()
    });