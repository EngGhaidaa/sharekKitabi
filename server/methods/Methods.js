/**
 * Created by omar on 3/4/16.
 */
Meteor.methods({
    addRating: function (bookId, stars) {
        if (this.userId) {
            if (Ratings.find({bookId:bookId,'rating.userId': this.userId}).fetch().length == 0)
                Ratings.upsert({bookId: bookId}, {
                    $push: {
                        rating: {
                            userId: this.userId,
                            value: stars
                        }
                    }
                }, function (err, result) {
                    if (!err)
                        Meteor.call('updateRating', bookId);

                });
            else {
                Ratings.update({bookId: bookId, 'rating.userId': this.userId}, {$set: {'rating.$.value': stars}}
                    , function (err, result) {
                        if (!err)
                            Meteor.call('updateRating', bookId)
                    });
            }
        }
    },
    updateRating: function (bookId) {
        var ratings = [0, 0, 0, 0, 0, 0];
        var bookratings = Ratings.findOne({bookId: bookId});
        var rating = 0;
        if(bookratings)
        {var values = _.each(_.pluck(bookratings.rating, 'value'), function (num) {
            ratings[num]++;
        })
         rating = (5 * ratings[5] + 4 * ratings[4] + 3 * ratings[3] + 2 * ratings[2] + 1 * ratings[1]) / (_.reduce(ratings, function (memo, num) {
                return memo + num;
            }, 0))}

        Books.update({_id: bookId}, {$set: {rating: parseInt(rating)}});
        //TODO to adjust this algorithm to manipulate if only one rating from on user what will happen

    },
    editappointment:function(app_id,placeid,dat,u,pa,b) {
        if (
            //Appointments.find({_id: app_id})&&
       ! Appointments.findOne({'user.id':u,'user.book':b}))
        {
            Appointments.update({place: placeid._id, date: dat},
                {
                    $set:{can: true},
                    $push: {
                        user: {
                          book: b,
                            id: u,
                            pay: pa
                        }
                        //    'user.$.book':b,
                        //    'user.$.value':u,
                        //    'user.$.pay':pa,
                        //    can:true
                    }
                })
        }
        else
        {
            return false;
        //    Appointments.update({place: placeid._id, date: dat},
        //        {$set:{can:true,'user.id':u,'user.book':b,'user.pay':pa}})
        }
    }
});