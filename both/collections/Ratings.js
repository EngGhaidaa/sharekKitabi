/**
 * Created by omar on 2/19/16.
 */

Ratings = new Mongo.Collection('ratings');
ratingSchema = new SimpleSchema({
    bookId: {
        type: String
        //custom: function () {
        //    if (Ratings.findOne(this.value)) {
        //        return 'Existed';
        //    }
        //}
    },
    rating: {
        type: [Object],
        optional: true
    },
    'rating.$':{
        type: Object,
        optional: true
    },
    'rating.$.value': {
        type: Number,
        autoValue: function () {
            if (this.isInsert) {
                return 0
            }
        }
    },
    'rating.$.userId': {
        type: String,
        custom: function () {
            if (Ratings.findOne(this.value)) {
                return 'Existed';
            }
        }
    }

});
Ratings.attachSchema(ratingSchema);

//
Ratings.allow({
    insert: function (userId) {

        return (Meteor.users(userId));
    },
    update: function (userId, doc) {
        return true;
    }
});


