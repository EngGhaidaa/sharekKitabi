Template.HomePublic.rendered = function() {
	
};

Template.HomePublic.events({
	
});

Template.HomePublic.helpers({
	
});

Template.HomePublicHomeJumbotron.rendered = function() {
	
};

Template.HomePublicHomeJumbotron.events({
	"click #jumbotron-button": function(e) {
		e.preventDefault();
		Router.go("categories");
	}

});

Template.HomePublicHomeJumbotron.helpers({
	
});
