this.CategoriesController = RouteController.extend({
    template: "categories",


    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    action: function () {

        this.render('categories');
    },
    waitOn: function () {
        return [Meteor.subscribe('books'),Meteor.subscribe('categories')]
    }

});