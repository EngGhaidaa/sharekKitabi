/**
 * Created by omar on 7/14/16.
 */
Adds=new Mongo.Collection('adds');
addSchema = new SimpleSchema({
    number:{
        type:Number,
        label:"رقم",
        unique:true,
        min:0
    },
    title:{
        type:String,
        label:"اسم الإعلان",
        optional:true
    },
    img: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: 'حمل صورة'
            }
        }
    }
});
TabularTables = {};
TabularTables.Adds = new Tabular.Table({
    name: "Adds",
    collection: Adds,
    columns: [
        {data: "number", title: "رقم"},
        {data: "title", title: "اسم الإعلان"},
        {data: "img", title: "ألصورة"},
        {
            tmpl: Meteor.isClient && Template.AddActionBtns, class: "col-md-1"
        }
    ]
})
Adds.attachSchema(addSchema);
Adds.allow({
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
