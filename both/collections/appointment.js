Appointments=new Mongo.Collection('appointments');
AppointmentSchema = new SimpleSchema({
    place: {
        type: String,
        label: "المكان",
        autoform: {
            type: 'select',
            options: function () {
                return {
                    "المركز": "المركز",
                    "فاتح": "فاتح",
                    "تقسيم": "تقسيم"
                }
            }
        }
    },
    time:
    {
        type:String,
        label:"وقت التسليم",
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
        {data: "place", title: "المكان"},
        {data: "time", title: "وقت التسليم", type:'datetime',
            render: function (val) {
                return moment(val).format( "dd D/MM/YYYY hh:mm:ss a");
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
//ToDO complait method



