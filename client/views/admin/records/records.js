var s="true";
Template.records.helpers({
    users: function()
    {
        return Users.find();
    },
    booksrent:function()
    {
        return Books.find({'renting.value':s});
    },
    username: function(id)
    {
        var username=Users.findOne({_id:id}).profile.name;
        return username;
    },
    bookspurch:function()
    {
        return Books.find({'purching.value':s});
    }
});
Template.UserActionBtns.events({
    'click #btnRemove': function(){
        Session.set("userID", this._id);
    }
});
Template.TmpModalRemoveuser.helpers({
    data: function(){
        return Users.findOne({_id: Session.get('userID')});
    }
});

Template.TmpModalRemoveuser.events({
    "click  #confirmTrue": function(){
        if (Meteor.userId()) {
            Users.remove({_id: Session.get('userID')}, function (err,result) {
                if(err)
                {
                    Meteor.call('deleteUsers',Session.get('userID'));
                }
            });
            var data = Users.findOne({_id: Session.get('userID')});
            var t = "تم حذف المستخدم";
            toastr.success(data, t, {
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            //location.reload();


        }
    }
});

//