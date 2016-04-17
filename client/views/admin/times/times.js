Template.AppointmentActionBtns.events({
    'click #btnUpdateApp': function(){
        Session.set("appointmentID", this._id);
    },
    'click #btnRemoveApp': function(){
        Session.set("appointmentID", this._id);
    }
});
Template.TmplModalRemove2.helpers({
    data: function(){
        return Appointments.findOne({_id: Session.get('appointmentID')});
    }
});

Template.TmplModalRemove2.events({
    "click  #confirmTrue": function(){
        if (Meteor.userId()) {
            var data = Appointments.findOne({_id: Session.get('appointmentID')});
            var t = "تم حذف الموعد";
            var msg = data.title;
            toastr.success(msg, t,{
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            Appointments.remove({_id: Session.get('appointmentID')});
        }
    }
});

AutoForm.addHooks('afUpdateAppointment', {
    onSuccess:
        function(formType, result) {
            $('#updateModalApp').modal('hide')
            var data = Appointments.findOne({_id: Session.get('appointmentID')});
            var title = "تم تعديل الموعد";
            var msg = data.title;
            toastr.success(msg, title, {
                positionClass: "toast-top-center",
                timeOut: "500"
            })
        }
});
Template.UpdateAppointmentForm.helpers({
    selectedAppointmentDoc: function(){
        return Appointments.findOne({_id: Session.get('appointmentID')});
    }
});
AutoForm.hooks({
    insertAppointmentForm :{
        onSuccess:
            function (formType, result) {
                $("#addeModalApp").modal({show: false});
            sAlert.success('تم الإضافة بنجاح', {
                effect: 'genie', position: 'top-right',
                timeout: '500', onRouteClose: false,
                stack: false, offset: '80px'
            });
        }
    }
});


Template.PlaceActionBtns.events({
    'click #btnUpdatePl': function(){
        Session.set("placeID", this._id);
    },
    'click #btnRemovePl': function(){
        Session.set("placeID", this._id);
    }
});
Template.TmplModalRemove3.helpers({
    data: function(){
        return Places.findOne({_id: Session.get('placeID')});
    }
});
Template.TmplModalRemove3.events({
    "click  #confirmTrue": function(){
        if (Meteor.userId()) {
            var data = Places.findOne({_id: Session.get('placeID')});
            var t = "تم حذف المكان";
            var msg = data.title;
            toastr.success(msg, t,{
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            Places.remove({_id: Session.get('placeID')}, function (err,result) {
                if(!err)
                {
                   Meteor.call('deleteAppointmentForPlace',Session.get('placeID'));
                }
            });

        }
    }
});
AutoForm.addHooks('afUpdatePlace', {
    onSuccess:
        function(formType, result) {
            $('#updateModalPl').modal('hide')
            var data = Places.findOne({_id: Session.get('placeID')});
            var title = "تم تعديل المكان";
            var msg = data.title;
            toastr.success(msg, title, {
                positionClass: "toast-top-center",
                timeOut: "500"
            })
        }
});
Template.UpdatePlaceForm.helpers({
    selectedPlaceDoc: function(){
        return Places.findOne({_id: Session.get('placeID')});
    }
});
AutoForm.hooks({
    insertPlaceForm :{
        onSuccess:
            function (formType, result) {
                $("#addeModalPl").modal({show: false});
            sAlert.success('تم الإضافة بنجاح', {
                effect: 'genie', position: 'top-right',
                timeout: '500', onRouteClose: false,
                stack: false, offset: '80px'
            });
        }
    }
});
Template.times.events
({
    "click #btnadddApp":function(){
        $('#addeModalApp').modal('show')
    },
    "click #btnadddPl":function(){
        $('#addeModalPl').modal('show')
    }
})
//TODO edit delete app& hide modal add