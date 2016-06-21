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
$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed == true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});