this.BookDetailsController = RouteController.extend({
    template: "details",

    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    action: function () {

        this.render('details');
    },

waitOn: function () {
    return [Meteor.subscribe('bookDetail',this.params.id),Meteor.subscribe('categories'),
        Meteor.subscribe('books'), Meteor.subscribe('rentbook'), Meteor.subscribe('purchbook')
    ]
}
});