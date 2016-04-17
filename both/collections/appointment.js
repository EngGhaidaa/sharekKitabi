Appointments=new Mongo.Collection('appointments');
AppointmentSchema = new SimpleSchema({
    place: {
        type: String,
        label: "المكان",
        autoform: {
            type: 'select',
            options: function () {
                return Places.find().map(function (c) {
                    return {label: c.title, value: c._id}
                })
            },
            firstOption: 'اختر المكان المناسب'
        }
    },
    date:
    {
        type:Date,
        label:"وقت وتاريخ التسليم",
            autoform: {
                afFieldInput: {
                    type: "datetime-local"
                }
            }
    },
    book:
    {
        type: String,
        label: "اسم الكتب",
        optional: true
    },
    user:
    {
        type: String,
        label: "اسم المستخدم",
        optional: true
    },
    pay:
    {
        type:Boolean,
        optional:true
    }
});
Appointments.attachSchema(AppointmentSchema);
Appointments.allow({
    insert: function (userId) {
        return (Meteor.users.isAdmin(userId));
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },

    remove: function (userId, doc) {
        return true;
    }
});
TabularTables = {};
TabularTables.Appointments = new Tabular.Table({
    name: "Appointments",
    collection: Appointments,
    columns: [
        {data: "placename()", title: "المكان"},
        {data: "date", title: "وقت وتاريخ التسليم", type:'datetime',
            render: function (val) {
                return moment(val).format( " dd D/MM/YYYY hh:mm A ");
            }
        },
        //{data:"bookcounter()",title:""},
        //{data:"bookname()",title:""},
        //{data:"username",title:""},
        //{data:"paytype",title:""},

        {
            tmpl: Meteor.isClient && Template.AppointmentActionBtns, class: "col-md-1"
        }
    ]
});
//Appointments.helpers({
//    bookcounter: function ()
// {
//        var book = Appointments.
//        return
//    },
//    bookname: function()
// {
//    var book=
//    return
// },
//    username: function()
// {
//    var book=
//    return
// },
//    paytype: function()
// {
//    var book=
//    return
// }
//});

Appointments.helpers({
    placename: function () {
        var idapp = Appointments.findOne(this._id);
        var idpl=Appointments.findOne(idapp._id).place;
        return Places.findOne(idpl)?Places.findOne(idpl).title:"unknown";
    }
});



