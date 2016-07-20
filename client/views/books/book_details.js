Template.details.helpers({
    thisBook: function () {
        return Books.findOne({_id: Router.current().params.id});
    },
    catname:function(catid){
        return Categories.findOne({number:catid}).title;
    }

});

Template.details.events({
    'click .js-rate-book': function (event) {
 //console.log($(event.currentTarget).data("userrating"));
        if(!this.user)
        {$("#Modellogin").modal({show: true,backdrop: true});}

        var starsevent = $(event.currentTarget).data("userrating");
        var book_id = this.id;
        //var rating = '{rating.' + 'one' +':'+1+'}';
        Meteor.call('addRating',book_id,starsevent);
    },

    'click #btnlogin':function() {
        Router.go("login");
        $('.modal-backdrop').remove();
        },

    'click #rentbtn':function(event){
        if(!Meteor.userId())
        {$("#Modellogin").modal({show: true,backdrop: true});}
        else
        { var z=Router.current().params.id;
            Router.go("appointment",{bookid:z,purchvalue:false,rentvalue:true});}
    },

    'click #purchbtn':function(event) {
        if(!Meteor.userId())
        {$("#Modellogin").modal({show: true,backdrop: true});}
        else
        {  var z=Router.current().params.id;
            Router.go("appointment",{bookid:z,purchvalue:true,rentvalue:false});}
    }

    //'click #btnpaymun':function() {
    //    var z=Router.current().params.id;
    //    //var pay=true;
    //    Router.go("appointment",{bookid:z,purchvalue:true,rentvalue:false});
    //    $('.modal-backdrop').remove();
    //},

    //'click #btnpaypal':function() {
    //    var z=Router.current().params.id;
    //    Router.go("paypal",{bookid:z,payb:false,purchvalue:true,rentvalue:false});
    //    $('.modal-backdrop').remove();
    //},

    //'click #btnrentmun':function() {
    //    var z=Router.current().params.id;
    //    console.log(z);
    //    Router.go("appointment",{bookid:z,payb:true,rentvalue:true,purchvalue:false});
    //    $('.modal-backdrop').remove();
    //},

    //'click #btnrentpal':function() {
    //    var z=Router.current().params.id;
    //    Router.go("paypal",{bookid:z,payb:false,rentvalue:true,purchvalue:false});
    //    $('.modal-backdrop').remove();
    //}
    //ToDo compliet router par
});
