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

    time:function(time){
        var myVar = setInterval(myTimer,1000);
        var d = new Date();
       if(time< d.toLocaleTimeString())
       {var ti=Appointments.findOne({date:time});
           Appointments.remove(ti)}
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

    },
    editappointment:function(app_id,placeid,dat,u,pa,b,purch,rent) {
        if (
            //Appointments.find({_id: app_id})&&
       !Appointments.findOne({'user.id':u,'user.book':b,_id:app_id}))
        {
            Appointments.update({place: placeid._id, date: dat},
                {
                    $set:{can: true},
                    $push: {
                        user: {
                          book: b,
                            id: u,
                            pay: pa,
                            rent:rent,
                            purch:purch
                        }
                        //    'user.$.book':b,
                        //    'user.$.value':u,
                        //    'user.$.pay':pa,
                        //    can:true
                    }
                })
            if(rent=='true')
            {
                Books.update({_id:b},
                    {
                        $push:{
                            renting:{
                                value:rent,
                                user:u
                            }
                        }
                    })
            }
            else
            {
                Books.update({_id:b},
                    {
                        $push:{
                            purching:{
                                value:purch,
                                user:u
                            }
                        }
                    })
            }
        }
        else
        {
            return false;
        //    Appointments.update({place: placeid._id, date: dat},
        //        {$set:{can:true,'user.id':u,'user.book':b,'user.pay':pa}})
        }
    }
});