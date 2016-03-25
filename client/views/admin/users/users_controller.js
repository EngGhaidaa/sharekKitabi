this.UsersController = RouteController.extend({
    template: "users",


    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn: function () {
        return Meteor.subscribe('users')
    }
});