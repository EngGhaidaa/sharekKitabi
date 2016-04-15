Template.appointment.helpers({
    appointments:function()
    {
        if(Session.get('appointCenter')) {
            return Appointments.find({place:Session.get('appointCenter')});
        }
        else{
          return Appointments.find();
        }
    },
    getPlaceName: function (place) {
// TODO get the arabic name to display it in html
        // parameter place containes the id of place
    }
})
Template.appointment.events({
   'click .btn-filter': function ()
   {
       Session.set('appointCenter',$(event.target).data('target'));
   },
   'click #tablepay tbody tr' :function()
   {
    console.log("ok");
   }

});