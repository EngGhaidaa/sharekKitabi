this.CategoriesController = RouteController.extend({
    template: "categories",

    yieldTemplates: {
        /*YIELD_TEMPLATES*/
        //'categories': {to: 'main'},
        //'HomePrivate': {to: 'rightSide'},


    },
    waitOn: function () {
        return [Meteor.subscribe('books'), Meteor.subscribe('categories'),
            Meteor.subscribe('books'), Meteor.subscribe('rentbook'), Meteor.subscribe('purchbook')

        ]
    },
    //yieldTemplates: {
    //    'categories': {to: 'main'},
    //    'HomePrivate': {to: 'rightSide'}
    //}

});