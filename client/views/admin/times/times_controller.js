this.TimesController = RouteController.extend({
    template: "times",

    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },

    waitOn: function () {
        return Meteor.subscribe('appointments')
    }
});