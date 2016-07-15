this.BooksController = RouteController.extend({
    template: "books",


    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    action: function () {

       this.render('books');
    },
});
