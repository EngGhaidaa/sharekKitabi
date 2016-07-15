        Books = new Mongo.Collection('books');
BookSchema = new SimpleSchema({
    BookID :{
        type:String,
        unique: true
    },

    title: {
        type: String,
        label: "اسم الكتاب",
    },
    author: {
        type: String,
        label: "المؤلف",
        optional: true

    },
    publisher: {
        type: String,
        label: "الناشر",
        optional: true

    },
    Edition: {
        type:Number,
        label:" الطبعة",
        optional: true
    },
    YearPrint:{
        type:Number,
        optional: true,
        label:"سنة الطبعة"
    },
    numberOfPages: {
        type: Number,
        label: "عدد الصفحات",
        min: 0,
        optional: true

    },
    categorie: {
        type: String,
        label: "اسم القسم",
        autoform: {
            type: 'select',
            options: function () {
                return Categories.find().map(function (c) {
                    return {label: c.title, value: c._id}
                })
            },
            firstOption: 'اختر التصنيف المناسب'
        }
    },
    summary: {
        type: String,
        label: "لمحة عن الكتاب",
        optional: true
    },
    insurance: {
        type: Number,
        min: 0,
        label: "سعر التأمين",
        optional: true

    },
    rent: {
        type: Number,
        min: 0,
        label: "سعر الإيجار"
    },
    rentTime: {
        type: String,
        label: "مدة الإيجار"
    },
    copiesRent: {
        type: Number,
        label: "عدد النسخ للاستعارة",
        min: 0
    },
    purch: {
        type: Boolean
    },
    purchasingadmin:{
        type: Number,
        label: "سعر الشراء من المصدر",
        optional: true,
        min: 0
    },

    purchasing: {
        type: Number,
        label: "سعر الشراء",
        optional: true,
        min: 0
        //  regEx:^\d+(,\d{1,2})?$

    },
    copiesPurchas: {
        type: Number,
        label: "عدد النسخ للشراء",
        min: 0,
        optional: true
    },
    rack: {
        type: Number,
        label: "الرف",
        min: 0,
        optional: true

    },

    source: {
        type: String,
        label: "مصدر الكتاب",
        defaultValue: "شارك كتابي"
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
    },
    rating: {
        type: String,
        autoValue: function () {
            if (this.isInsert) {
                return '1';
            }

        },
        label: "Rate it",
        allowedValues: ["1", "2", "3", "4", "5"],
        autoform: {
            options: {
                "0": 0,
                "1": 1,
                "2": 2,
                "3": 3,
                "4": 4,
                "5": 5
            }
        }
    },
    renting: {
        type: [Object],
        optional: true
    },
    'renting.$': {
        type: Object,
        optional: true
    },
    'renting.$.value': {
        type: String
    },
    'renting.$.user': {
        type: String
    },
    'renting.$.now': {
        type: String,
        optional: true
    },
    purching: {
        type: [Object],
        optional: true
    },
    'purching.$': {
        type: Object,
        optional: true
    },
    'purching.$.value': {
        type: String
    },
    'purching.$.user': {
        type: String
    },
    'purching.$.now': {
        type: String,
        optional: true
    }
});
Books.attachSchema(BookSchema);
Books.allow({
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
TabularTables.Books = new Tabular.Table({
    name: "Books",
    collection: Books,
    extraFields: ['purching','purchasingadmin','profit',"categorie"],
    columns: [
        {data: "title", title: "اسم الكتاب"},
        {data: "author", title: "الكاتب"},
        {data: "publisher", title: "الناشر"},
        {data:"Edition",title:"الطبعة"},
        {data:"YearPrint",title:"سنة الطبعة"},
        {data: "numberOfPages", title: "عدد الصفحات"},
        {data: "categorieName()", title: "التصنيف"},
        {data: "insurance", title: "سعر التأمين"},
        {data: "rent", title: "سعر الاستعارة"},
        {data: "rentTime", title: "مدة الاستعارة"},
        {data: "copiesRent", title: "عدد النسخ للاستعارة"},
        // {data:"purch",title:"متاح للشراء", class: "col-md-3"},
        {data: "copiesPurchas", title: "عدد النسخ للشراء"},
        {data:"purchasingadmin",title:"سعر الشراء من المصدر"},
        {data: "purchasing", title: "سعر الشراء"},
        {data:"profit()",title:"الربح"},
        {data: "rack", title: "الرف"},
        {data: "source", title: "المصدر"},
        {data: "img", title: "الصورة"},
        {data: "summary", title: "نبذة حول الكتاب", class: "cpl-md-6"},
        //{data:"rating",title:"التقييم"},
        {
            tmpl: Meteor.isClient && Template.BookActionBtns, class: "col-md-1"
        }
    ]
});
var s = "true";
TabularTables = {};
TabularTables.Books = new Tabular.Table({
    name: "BooksRecourdsRent",
    collection: Books,
    selector: function () {
        return {'renting.value': s};
    },
    columns: [
        {data: "title", title: "اسم الكتاب"},
        //{data:"username()",title:"اسم الممستعير"},
        //{
        //    tmpl: Meteor.isClient && Template.BookRentActionBtns, class: "col-md-1"
        //}
    ]
})
TabularTables = {};
TabularTables.Books = new Tabular.Table({
    name: "BooksRecourdsPurch",
    collection: Books,
    extraFields: ['purching','categorie'],
    selector: function () {
        return {'purching.value': s};
    },
    columns: [
        {data: "title", title: "اسم الكتاب"},
        {data: "numberOfPayments()", title: "أسماء المشترين"}
        //{
        //    tmpl: Meteor.isClient && Template.BookPurchActionBtns, class: "col-md-1"
        //}
    ]
})

Books.helpers({
    categorieName: function () {
        debugger;
        //var categorie = Books.findOne(this._id).categorie;
        //return Categories.findOne(categorie).title
        var idcata = Books.findOne(this._id);
        var idbok = Books.findOne(idcata._id).categorie;

        return Categories.findOne({number:idbok}).title;

    },
    numberOfPayments: function () {
        var names = '';
        if (this.purching && this.purching.length > 0) {
            this.purching.forEach(function (elem) {
                var user = Users.findOne(elem.user)
                if (user && user.profile.name)
                    names += ' ,' + user.profile.name;

            })

        }
        return names ? names : "لا أحد";
    },
    bookrent: function () {
        var x = Books.find({'renting.value': true});
        return Books.findOne(x).title;
        console.log("ss");
    },
    profit:function(){
        if(this.purchasing>0)
        {
            return this.purchasing-this.purchasingadmin;
        }
    }
});

booksIndex = new EasySearch.Index({
    collection: Books,
    fields: ['title'],
    engine: new EasySearch.MongoDB()

});