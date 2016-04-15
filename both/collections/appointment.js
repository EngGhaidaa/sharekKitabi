Appointments=new Mongo.Collection('appointments');
AppointmentSchema = new SimpleSchema({
    place: {
        type: String,
        label: "المكان",
        autoform: {
            type: 'select',
            firstOption:'اختر مركزاً',
            options: function () {
                //TODO return the values from Places and map them
                return [
                {label:"المركز",value:"Office"},
                {label:'الفاتح',value:"Fatih"},
                {label: 'تقسيم',value:"Taksim"}
                ]
            }
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
        {data: "place", title: "المكان",render: function (val) {
// TODO fix this Display to display right name
        }},
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
//ToDO complait method


Places = new Mongo.Collection('places');
Places.attachSchema(new SimpleSchema(
    {

    }
))
