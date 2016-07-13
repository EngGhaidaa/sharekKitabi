this.CategoriesController = RouteController.extend({
    template: "categories",

    yieldTemplates: {
        /*YIELD_TEMPLATES*/
        //'categories': {to: 'main'},
        //'HomePrivate': {to: 'rightSide'},


    },
    waitOn: function () {

        return  Meteor.subscribe('categories',Session.get('limit'));

    },
    //yieldTemplates: {
    //    'categories': {to: 'main'},
    //    'HomePrivate': {to: 'rightSide'}
    //}

});