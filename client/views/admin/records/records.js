$("#Model").modal({show: true,backdrop: true})
Template.records.helpers({

});
Template.users.helpers({
    users: function(){
        return Users.find();
    }
});
Template.UserActionBtns.events({
    'click #btnRemove': function(){
        Session.set("userID", this._id);
    }
});
Template.TmpModalRemove.helpers({
    data: function(){
        return Users.findOne({_id: Session.get('userID')});
    }
});

Template.TmpModalRemove.events({
    "click  #confirmTrue": function(){
        if (Meteor.userId()) {
            var data = Users.findOne({_id: Session.get('userID')});
            var t = "تم حذف المستخدم";
            var msg = data.title;
            toastr.success(msg, t,{
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            Users.remove({_id: Session.get('userID')});
        }
    }
});

//