this.EditBookController = RouteController.extend({
    template: "editbook",


    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return Meteor.subscribe('categories')

    }
});