Meteor.publish(null, function () {
    return Categories.find();
})
Meteor.publish("books", function (categorie,limit) {
    return Books.find({categorie:categorie}, {limit: limit});
})
Meteor.publish(null, function () {
    return Images.find();
})
Meteor.publish('bookDetail', function (id) {
    return Books.find({_id: id});
})
Meteor.publish('users', function () {
    return Users.find();
})
Meteor.publish(null, function () {
    return Books.find({'renting.value': 'true'});
})
Meteor.publish(null, function () {
    return Books.find({'purching.value': 'true'});
})
Meteor.publish('appointments', function () {
    return Appointments.find();
})
Meteor.publish('places', function () {
    return Places.find();
})
Meteor.publish('bookappoin', function (bookid) {
    return Books.find({_id: bookid});
})
Meteor.publish(null, function () {
    return Adds.find();
})