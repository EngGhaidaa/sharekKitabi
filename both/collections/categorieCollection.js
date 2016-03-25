Categories=new Mongo.Collection('categories');
categorieSchema = new SimpleSchema({
    title:{
        type:String,
        label:"اسم القسم"
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
Categories.attachSchema(categorieSchema);
Categories.allow({
    insert: function (userId) {
        return (Meteor.users.isAdmin(userId));
    }
})