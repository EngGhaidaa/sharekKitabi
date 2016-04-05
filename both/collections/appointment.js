Appointments=new Mongo.Collection('appointments');
AppointmentSchema = new SimpleSchema({
    place: {
        type: String,
        label: "المكان",
        autoform: {
            type: 'select',
            options: function () {
                return {
                    Basak: "المركز",
                    Fatih: "فاتح",
                    Taqsem: "تقسيم"
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
        {data: "time", title: "وقت التسليم"},

        {
            tmpl: Meteor.isClient && Template.AppointmentActionBtns, class: "col-md-1"
        }
    ]
});



