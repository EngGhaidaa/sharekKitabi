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
Meteor.publish('rentbook', function () {
    return Books.find({});
})
Meteor.publish('purchbook', function () {
    return Books.find({});
})
Meteor.publish('appointments', function () {
    return Appointments.find();
})
Meteor.publish('places', function () {
    return Places.find();
})
Meteor.publish('bookappoin', function (bookid) {
    return Books.find({_id:bookid});
})
//Meteor.publish('bookpay', function (bookid,pay) {
//    return Books.find({_id:bookid});
//})