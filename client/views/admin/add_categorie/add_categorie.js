AutoForm.hooks({
    insertCategorieForm: {
        onSuccess: function () {
            sAlert.success('تم الإضافة بنجاح', {
                effect: 'genie', position: 'top-right',
                timeout: '1000', onRouteClose: false,
                stack: false, offset: '80px'});
        }
    }
})
Template.CategoriesrecordActionBtns.events({
    'click #btnUpdate': function(){
        Session.set("categorieID", this._id);
    },
    'click #btnRemove': function(){
        Session.set("categorieID", this._id);
    }
});
Template.TmplModalRemovec.helpers({
    data: function(){
        return Categories.findOne({_id: Session.get('categorieID')});
    }
});

Template.TmplModalRemovec.events({
    "click  #confirmTrue": function(){
        if (Meteor.userId()) {
            var data = Categories.findOne({_id: Session.get('categorieID')});
            var t = "تم حذف التصنيف";
            var msg = data.title;
            toastr.success(msg, t,{
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            Categories.remove({_id: Session.get('categorieID')});
        }
        location.reload();
    }

});

AutoForm.addHooks('afUpdateCategories', {
    onSuccess:
        function(formType, result) {
            $('#updateModal').modal('hide')
            var data = Categories.findOne({_id: Session.get('categorieID')});
            var title = "تم تعديل التصنيف";
            var msg = data.title;
            toastr.success(msg, title, {
                positionClass: "toast-top-center",
                timeOut: "500"
            })
        }
});
Template.UpdateCategoriesrecordForm.helpers({
    selectedCategoriesDoc: function(){
        return Categories.findOne({_id: Session.get('categorieID')});
    }
});