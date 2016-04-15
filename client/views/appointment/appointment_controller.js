this.AppointmentController = RouteController.extend({
    template: "appointment",


    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    action: function () {

        this.render('appointment');
    },
    waitOn:function(){
        Meteor.subscribe('appointments');
    }
})
