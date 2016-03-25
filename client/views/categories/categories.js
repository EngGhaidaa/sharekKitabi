Template.categories.helpers({
  categories: function(){
    return Categories.find();
  },
  booksCounter:function() {
    return Books.find({categorie: this._id}).count();
  }
});
////////////
//var pageSession = new ReactiveDict();
//var BooksViewItems = function(cursor) {
//  if(!cursor) {
//    return [];
//  }
//
//  var searchString = pageSession.get("BooksViewSearchString");
//  var sortBy = pageSession.get("BooksViewSortBy");
//  var sortAscending = pageSession.get("BooksViewSortAscending");
//  if(typeof(sortAscending) == "undefined") sortAscending = true;
//
//  var raw = cursor.fetch();
//
//  // filter
//  var filtered = [];
//  if(!searchString || searchString == "") {
//    filtered = raw;
//  } else {
//    searchString = searchString.replace(".", "\\.");
//    var regEx = new RegExp(searchString, "i");
//    var searchFields = ["title"];
//    filtered = _.filter(raw, function(item) {
//      var match = false;
//      _.each(searchFields, function(field) {
//        var value = (getPropertyValue(field, item) || "") + "";
//
//        match = match || (value && value.match(regEx));
//        if(match) {
//          return false;
//        }
//      })
//      return match;
//    });
//  }
//
//  // sort
//  if(sortBy) {
//    filtered = _.sortBy(filtered, sortBy);
//
//    // descending?
//    if(!sortAscending) {
//      filtered = filtered.reverse();
//    }
//  }
//
//  return filtered;
//};
//Template.categories.events({
//
//"click #dataview-search-button": function(e, t) {
//  e.preventDefault();
//  var form = $(e.currentTarget).parent();
//  if(form) {
//    var searchInput = Books.findOne("#dataview-search-input");
//    if(searchInput) {
//      searchInput.focus();
//      var searchString = searchInput.val();
//      pageSession.set("BooksViewSearchString", searchString);
//    }
//
//  }
// // return false;
//},
//
//"keydown #dataview-search-input": function(e, t) {
//  if(e.which === 13)
//  {
//    e.preventDefault();
//    var form = $(e.currentTarget).parent();
//    if(form) {
//      var searchInput = form.find("#dataview-search-input");
//      if(searchInput) {
//        var searchString = searchInput.val();
//        pageSession.set("BooksViewSearchString", searchString);
//      }
//
//    }
//    return false;
//  }
//
//  if(e.which === 27)
//  {
//    e.preventDefault();
//    var form = $(e.currentTarget).parent();
//    if(form) {
//      var searchInput = form.find("#dataview-search-input");
//      if(searchInput) {
//        searchInput.val("");
//        pageSession.set("BooksViewSearchString", "");
//      }
//
//    }
//    return false;
//  }
//
//  return true;
//}
//});
// On Client
