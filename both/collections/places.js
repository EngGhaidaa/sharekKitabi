Places = new Mongo.Collection('places');
Places.attachSchema(new SimpleSchema(
    {
        title:
        {
            type:String,
            label:"اسم المكان"
        },
        details:
        {
            type:String,
            label:"تفصيل المكان",
            optional:true
        }

    }
))
Places.allow({
    insert: function (userId) {
        return (Meteor.users.isAdmin(userId));
    },
    update: function (userId, doc, fields, modifier) {
        return true;
    },

    remove: function (userId, doc) {
        return true;
    }
})
TabularTables = {};
TabularTables.Appointments = new Tabular.Table({
    name: "Places",
    collection: Places,
    columns: [
        {data: "title", title: "اسم المكان"},
        {data: "details", title: "تفاصيل المكان"},
        {
            tmpl: Meteor.isClient && Template.PlaceActionBtns, class: "col-md-1"
        }
    ]
});