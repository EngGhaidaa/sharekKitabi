Template.details.helpers({
    thisBook: function () {
        return Books.findOne({_id: Router.current().params.id});
    },


});

Template.details.events({
    'click .js-rate-book': function (event) {

        //console.log($(event.currentTarget).data("userrating"));
        if(!this.user)
        {$("#myModal").modal({show: true,backdrop: true});}


        var starsevent = $(event.currentTarget).data("userrating");

        var book_id = this.id;
        //var rating = '{rating.' + 'one' +':'+1+'}';
        Meteor.call('addRating',book_id,starsevent);
    },
    'click #btnlogin':function() {
       // $("#myModal").modal({backdrop: false});
        Router.go("login");
        $('.modal-backdrop').remove();
        //

    }

});
