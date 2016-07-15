Template.books.helpers({
  categories: function(){
    return Categories.find({});
  },
  books: function(){
    return Books.find({categorie:Router.current().params.id});
  }
  //canPurch:function(){
  //  if(Books.findOne(id.purch))
  //  return true;
  //}
});
booksSubscribe =  new SubsManager();
Template.books.onCreated(function () {
  var instance = this ;
  instance.state = new ReactiveDict();
  debugger;
  instance.state.set('limit',6);
  instance.autorun(function(){
    debugger;
    var limit = instance.state.get('limit');
    booksSubscribe.subscribe('books', Router.current().params.id,limit);
  })

});
Template.books.events({
  'click .loadMore': function (event,template) {
    debugger;
    var limit = template.state.get('limit');
    template.state.set('limit',limit+6)
  }
})
