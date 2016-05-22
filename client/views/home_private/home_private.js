Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
	
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
