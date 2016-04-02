Books = new Mongo.Collection('books');
BookSchema = new SimpleSchema({
    title: {
        type: String,
        label: "اسم الكتاب",
    },
    author: {
        type: String,
        label: "المؤلف"
    },
    publisher: {
        type: String,
        label: "الناشر"
    },
    numberOfPages: {
        type: Number,
        label: "عدد الصفحات",
        min: 0
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
        label: "سعر التأمين"
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
        min: 0
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
    columns: [
        {data: "title", title: "اسم الكتاب"},
        {data: "author", title: "الكاتب"},
        {data: "publisher", title: "الناشر"},
        {data: "numberOfPages", title: "عدد الصفحات"},
        {data: "categorieName()", title: "التصنيف"},
        {data: "insurance", title: "سعر التأمين"},
        {data: "rent", title: "سعر الاستعارة"},
        {data: "rentTime", title: "مدة الاستعارة"},
        {data: "copiesRent", title: "عدد النسخ للاستعارة"},
        // {data:"purch",title:"متاح للشراء", class: "col-md-3"},
        {data: "copiesPurchas", title: "عدد النسخ للشراء"},
        {data: "purchasing", title: "سعر الشراء"},
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


Books.helpers({
    categorieName: function () {
        var categorie = Books.findOne(this._id).categorie;
        return Categories.findOne(categorie).title
    }
});

booksIndex = new EasySearch.Index({
    collection: Books,
    fields: ['title'],
    engine: new EasySearch.MongoDB()

});