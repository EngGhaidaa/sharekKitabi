Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
    //
    //"click #sidebar-wrapper-right":function(e) {
    //e.preventDefault();
    //$("#wrapper").toggleClass("active-right");
//}

});
var s="true";
Template.HomePrivate.helpers({
	rentbook: function () {
        if(Books.find({'renting.value':s}))
        {
            return Books.find({'renting.user':Meteor.userId()})
        }
    },
    purchbook: function () {
        if(Books.find({'purching.value':s}))
        {
            return Books.find({'purching.user':Meteor.userId()})
        }
    }
});



/*Menu-toggle*/
//$("#menu-toggle-left").click(function(e) {
//    e.preventDefault();
//    $("#wrapper").toggleClass("active-left");
//});
