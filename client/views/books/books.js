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
