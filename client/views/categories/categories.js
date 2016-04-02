Template.categories.helpers({
  categories: function(){
    return Categories.find();
  },
  booksCounter:function() {
    return Books.find({categorie: this._id}).count();
  }
});
Template.searchBox.helpers({
      checkInput: function () {
        if($('#searchInput').length >0)
        {return ($('#searchInput').val().length > 0);}
      },
      attributes: function () {
        return {
          placeholder: "اكتب هنا للبحث",
          id: "searchInput",
          class:'input-group'
        }
      },
      booksIndex: () => booksIndex
})
