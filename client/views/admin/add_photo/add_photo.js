AutoForm.hooks({
    insertAddForm: {
        onSuccess: function () {
            sAlert.success('تم الإضافة بنجاح', {
                effect: 'genie', position: 'top-right',
                timeout: '1000', onRouteClose: false,
                stack: false, offset: '80px'});
        }
    }
})
Template.AddActionBtns.events({
    'click #btnUpdate': function(){
        Session.set("addID", this._id);
    },
    'click #btnRemove': function(){
        Session.set("addID", this._id);
    }
});
Template.TmplModalRemoveadd.helpers({
    data: function(){
        return Adds.findOne({_id: Session.get('addID')});
    }
});

Template.TmplModalRemoveadd.events({
    "click  #confirmTrue": function(){
        if (Meteor.userId()) {
            var data = Adds.findOne({_id: Session.get('addID')});
            var t = "تم حذف الإعلان";
            var msg = data.title;
            toastr.success(msg, t,{
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            Adds.remove({_id: Session.get('addID')});
        }
        location.reload();
    }

});

AutoForm.addHooks('afUpdateAdds', {
    onSuccess:
        function(formType, result) {
            $('#updateModal').modal('hide')
            var data = Adds.findOne({_id: Session.get('addID')});
            var title = "تم تعديل الإعلان";
            var msg = data.title;
            toastr.success(msg, title, {
                positionClass: "toast-top-center",
                timeOut: "500"
            })
        }
});
Template.UpdateAddForm.helpers({
    selectedAddsDoc: function(){
        return Adds.findOne({_id: Session.get('addID')});
    }
});