this.RecordsController = RouteController.extend({
    template: "records",


    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    waitOn:function()
    {
        return [Meteor.subscribe("users"),Meteor.subscribe("rentbook"),
            Meteor.subscribe("purchbook"),Meteor.subscribe('books')]
    }
});