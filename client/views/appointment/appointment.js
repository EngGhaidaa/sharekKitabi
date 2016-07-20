function formatDate(date) {
    //console.log(date);
    if(!date) {
        return "";
    }
    var date;
    var f =  "dddd YYYY/MM/DD// h:mm a";

    if(_.isString(date)) {
        if(date.toUpperCase() == "NOW") {
            date = new Date();
        }
        if(date.toUpperCase() == "TODAY") {
            var d = new Date();
            date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        }
    }

    return moment(date).format(f);
}
var app_id;
var placeid;
var u;
var b;
var dat;
var purchvalue;
var rentvalue;

Template.appointment.helpers
({
    appointments:function()
    {
        if (Session.get('appointCenter'))
        {
            return Appointments.find({place: Session.get('appointCenter')});
        }
        else
        {
            return Appointments.find();
        }
    },
    places:function()
    {
        return Places.find();
    },

    getPlaceName: function (place)
    {
        return Places.findOne(place).title;
    },

})
Template.appointment.events({

   'click .btn-filter': function ()
   {
       Session.set('appointCenter',$(event.target).data('target'));
   },
   'click #tablepay tbody tr' :function()
   {
       placeid= Places.findOne(this.place);
       dat=this.date;
       app_id=this._id;
        u=Meteor.userId();
        b=Router.current().params.bookid;
       purchvalue=Router.current().params.purchvalue;
       rentvalue=Router.current().params.rentvalue;
       {$("#Modelaccept").modal({show: true,backdrop: "static"});}

   },
    'click #placebtn': function()
    {
     Session.set('appointCenter',null);
    },
   'click #btnsub':function()
   {
       Meteor.call('editappointment',app_id,placeid,dat,u,b,purchvalue,rentvalue);
       Router.go("categories");
       $(".modal-backdrop").remove();
   }
});