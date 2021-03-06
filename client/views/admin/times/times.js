Template.AppointmentActionBtns.events({
    'click #btnUpdateApp': function () {
        Session.set("appointmentID", this._id);
    },
    'click #btnRemoveApp': function () {
        Session.set("appointmentID", this._id);
    }
});
Template.TmplModalRemove2.helpers({
    data: function () {
        return Appointments.findOne({_id: Session.get('appointmentID')});
    }
});

Template.TmplModalRemove2.events({
    "click  #confirmTrue": function () {
        if (Meteor.userId()) {
            var data = Appointments.findOne({_id: Session.get('appointmentID')});
            var t = "تم حذف الموعد";
            var msg = data.title;
            toastr.success(msg, t, {
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            Appointments.remove({_id: Session.get('appointmentID')});
            location.reload();
        }
    }
});

AutoForm.addHooks('afUpdateAppointment', {
    onSuccess: function (formType, result) {
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
    selectedAppointmentDoc: function () {
        return Appointments.findOne({_id: Session.get('appointmentID')});
    }
});
AutoForm.hooks({
    insertAppointmentForm: {
        onSuccess: function (formType, result) {
            $('#addModalApp').modal('hide');
            var msg = 'تم الإضافة بنجاح';
            toastr.success(msg, {
                positionClass: "toast-top-center",
                timeOut: "450"
            })

        }
    }
});


Template.PlaceActionBtns.events({
    'click #btnUpdatePl': function () {
        Session.set("placeID", this._id);
    },
    'click #btnRemovePl': function () {
        Session.set("placeID", this._id);
    }
});
Template.TmplModalRemove3.helpers({
    data: function () {
        return Places.findOne({_id: Session.get('placeID')});
    }
});
Template.TmplModalRemove3.events({
    "click  #confirmTrue": function () {
        if (Meteor.userId()) {
            var data = Places.findOne({_id: Session.get('placeID')});
            var t = "تم حذف المكان";
            var msg = data.title;
            toastr.success(msg, t, {
                positionClass: "toast-top-center",
                timeOut: "900"
            });
            Places.remove({_id: Session.get('placeID')}, function (err, result) {
                if (!err) {
                    Meteor.call('deleteAppointmentForPlace', Session.get('placeID'));
                    location.reload();
                    //Appointments.remove({_id: Session.get('placeID')});
                    //table = $('#tabapp').DataTable();
                    //table.draw();
                }
            });

        }
    }
});
AutoForm.addHooks('afUpdatePlace', {
    onSuccess: function (formType, result) {
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
    selectedPlaceDoc: function () {
        return Places.findOne({_id: Session.get('placeID')});
    }
});
AutoForm.hooks({
    insertPlaceForm: {
        onSuccess: function (formType, result) {
            $('#addModalPl').modal('hide');
            var msg = 'تم الإضافة بنجاح';
            toastr.success(msg, {
                positionClass: "toast-top-center",
                timeOut: "450"
            })

        }

    }
});
Template.times.events
({
    "click #btnadddApp": function () {
        $('#addeModalApp').modal('show')
    },
    "click #btnadddPl": function () {
        $('#addeModalPl').modal('show')
    },
    "click #a": function () {
        console.log('sss');
    }
})
function formatDate(date) {
    if (!date) {
        return "";
    }
    var date;
    var f = "dddd YYYY/MM/DD// h:mm a";
    if (_.isString(date)) {
        if (date.toUpperCase() == "NOW") {
            date = new Date();
        }
        if (date.toUpperCase() == "TODAY") {
            var d = new Date();
            date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
        }
    }
    return moment(date).format(f);
}
var c = true;
Template.times.helpers
({
    time: function () {
        var t = Appointments.find(date);
        var time = formatDate(t);
        Meteor.call('time', time);
    },

    bookapp: function () {
        if (Appointments.find('user.id', fields({'user.book': 1})))
            return true;
    },

    appointment: function (type) {
        debugger;
        if(type==='purch')
        return Appointments.find({'user.purch':'true'});
        else
            return Appointments.find({'user.purch':'false'});
    },

    //appointment: function () {
    //    return Appointments.find({'user.rent': 'true'});
    //},

    users: function (type) {
        debugger;
        var array = _.filter(this.user, function (user) {
            if (user[type] === "true") {
                return user;

            }
        })
        console.log(array)
        return array


    },

    app: function (can) {
        if (Appointments.findOne(can))
            return true;
    },
    //,'user.book','user.pay')
    getPlaceName: function (place) {
        return Places.findOne({_id: place}).title;
    },
    bookcounter: function (idapp) {
        var booknum = Appointments.find({_id: idapp}, {fields: {book: 1}}).count();
        return booknum;
    },
    bookname: function (id) {
        var bookna = Books.findOne({_id: id});
        var bookname = Books.findOne(bookna).title;
        return bookname;
    },
    userna: function (id) {
        var username = Users.findOne({_id: id}).profile.name;
        return username;

    },

    payvalue: function (rent) {
        var value;
        if (rent == 'true') {
            value = 'استعارة';
        }
        else {
            value = 'بيع';
        }
        return value;
    }
})