Appointments=new Mongo.Collection('appointments');
AppointmentSchema = new SimpleSchema({
    can: {
        type: Boolean,
        defaultValue: false
    },
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
    date: {
        type: String,
        label: "وقت وتاريخ التسليم",
        custom:function(){
            //var momentA = moment(this.value,"YYYY-MM-DDTh:mm:ss.zzzz");
            //var momentB = moment(new Date(),"dddd YYYY/MM/DD// h:mm a");
            var date=new Date();
           var date2=new Date(this.value)
            if (date2 < date)
                return "baddate";

        },
        autoform: {
            afFieldInput: {
                type: "datetime-local"
            }
        }
    },
    user: {
        type: [Object],
        optional: true
    },
    'user.$': {
        type: Object,
        optional: true
    },
    'user.$.id': {
        type: String,
        custom: function () {
            if (Appointments.findOne(this.value)) {
                return 'Existed';
            }
        }
    },
    'user.$.book': {
        type: String
        //label: "اسم الكتب"
    },
    'user.$.rent':
    {
        type:String
    },
    'user.$.purch':
    {
        type:String
    }
});
Appointments.attachSchema(AppointmentSchema);
Appointments.allow({
    insert: function (userId) {
        return (Meteor.users.isAdmin(userId));
    },
    update: function () {
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
                return moment(val).format( "dddd YYYY/MM/DD// h:mm a ");
                //var t=Appointments.find(date);
                //var time= formatDate(t);
                //Meteor.call('time',time);
            }
        },
        {
            tmpl: Meteor.isClient && Template.AppointmentActionBtns, class: "col-md-1"
        }
    ]
});
//TabularTables = {};
//TabularTables.Appointments = new Tabular.Table({
//    name: "AppBook",
//    collection: Appointments,
//    columns: [
//        {data: "placename()", title: "المكان"},
//        {data: "date", title: "وقت وتاريخ التسليم", type:'datetime',
//            render: function (val) {
//                return moment(val).format( " dd D/MM/YYYY hh:mm A ");
//            }
//        },
//        {data:"bookcounter()",title:"عدد الكتب المراد تسليمها"},
//        {data:"bookname()",title:"أسماء الكتب"},
//        {data:"username()",title:"أسماء المستخدمين"},
//        {data:"paytype()",title:"طريقة الدفع"},
//
//        {
//            tmpl: Meteor.isClient && Template.AppointmentActionBtns, class: "col-md-1"
//        }
//    ]
//});

Appointments.helpers({
    placename: function () {
        var idapp = Appointments.findOne(this._id);
        var idpl=Appointments.findOne(idapp._id).place;
        return Places.findOne(idpl)?Places.findOne(idpl).title:Meteor.call('deleteAppointmentForPlace',idpl);
    },
    //bookcounter: function ()
    //{
    //
    //    var booknum = Appointments.find('user.book').count();
    //    return booknum;
    //},
    //bookname: function()
    //{
    //    var bookname=Books.findOne('user.book').title;
    //return bookname;
    //},
    //username: function()
    //{
    //    if(Books.findOne('user.value'))
    //    {  var username=Users.findOne('user.value').profile.name;
    //return username;}
    //},
    //paytype: function()
    //{
    //     var type;
    //var paytyp=Appointments.find('user.pay');
    //    if (paytyp.substring(0)=="t")
    //        type='دفع يدوي';
    //    else
    //        type='تم الدفع';
    //return type;
    //}
});



