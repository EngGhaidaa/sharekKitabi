Categories=new Mongo.Collection('categories');
categorieSchema = new SimpleSchema({
    number:{
      type:String,
        label:"رقم",
        optional:true
    },
    title:{
        type:String,
        label:"اسم القسم",
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
TabularTables.Categories = new Tabular.Table({
    name: "Categoriesrecord",
    collection: Categories,
    columns: [
        {data: "number", title: "رقم"},
        {data: "title", title: "اسم القسم"},
        {data: "img", title: "ألصورة"},
        {
            tmpl: Meteor.isClient && Template.CategoriesrecordActionBtns, class: "col-md-1"
        }
    ]
})
Categories.attachSchema(categorieSchema);
Categories.allow({
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
