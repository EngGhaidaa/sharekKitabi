this.AppointmentController = RouteController.extend({
    template: "appointment",


    yieldTemplates: {
        /*YIELD_TEMPLATES*/
    },
    action: function () {
        this.render('appointment');
    },
    waitOn:function(){
       return[ Meteor.subscribe('appointments'),Meteor.subscribe('places'),
           Meteor.subscribe('bookappoin',this.params.bookid)
           //Meteor.subscribe('bookpay',this.params.pay)
       ];
    }
})
