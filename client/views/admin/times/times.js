Template.AppointmentActionBtns.events({
    'click #btnUpdate': function(){
        Session.set("appointmentID", this._id);
    },
    'click #btnRemove': function(){
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
            $('#updateModal').modal('hide')
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
        onSuccess: function (formType, result) {
            sAlert.success('تم الإضافة بنجاح', {
                effect: 'genie', position: 'top-right',
                timeout: '1000', onRouteClose: false,
                stack: false, offset: '80px'
            });
        }
    }
});