Template.categories.helpers({
    categories: function () {
        return Categories.find();
    },
    booksCounter: function () {
        return Books.find({categorie: this._id}).count();
    },
    noMoreResult: function () {
        return Session.get('limit')> Categories.find().count();
    }
});
Template.searchBox.helpers({
    checkInput: function () {
        if (Router.current().route.getName() == "books") {
            return ($('#searchInput').val().length > 0 && this.categorie == Router.current().params.id)
        }
        return ($('#searchInput').val() && $('#searchInput').val().length > 0);
    },
    attributes: function () {
        return {
            placeholder: "اكتب هنا للبحث",
            id: "searchInput",
            class: 'input-group form-control'
        }
    },
    booksIndex: () => booksIndex
});
Template.categories.onCreated(function () {
    if(Session.get('limit') === undefined) {
        Session.set("limit", 6);
    }
});
Template.categories.events({
    'click .loadMore': function () {
        debugger;
        Session.set('limit', Session.get('limit')?Session.get('limit')+6:6);
    }
})