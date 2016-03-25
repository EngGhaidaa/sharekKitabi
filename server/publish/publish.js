Meteor.publish('categories',function(){
  return Categories.find();
})
Meteor.publish('books',function(){
return  Books.find();
})
Meteor.publish (null , function() {
 return Images.find();
})
Meteor.publish('bookDetail', function (id) {
    return Books.find({_id:id});
})
Meteor.publish('users', function () {
    return Users.find();
})