Template.BookActionBtns.events({
    'click #btnUpdate': function(){
        Session.set("bookID", this._id);
    },
    'click #btnRemove': function(){
        Session.set("bookID", this._id);
    }
});
Template.TmplModalRemove.helpers({
    data: function(){
        return Books.findOne({_id: Session.get('bookID')});
    }
});

Template.TmplModalRemove.events({
    "click  #confirmTrue": function(){
        if (Meteor.userId()) {
            var data = Books.findOne({_id: Session.get('bookID')});
            var t = "تم حذف الكتاب";
            var msg = data.title;
            toastr.success(msg, t,{
                positionClass: "toast-top-center",
                timeOut: "500"
            });
            Books.remove({_id: Session.get('bookID')});
        }
        location.reload();
    }

});

AutoForm.addHooks('afUpdateBook', {
    before: {
        update:
            function(doc){
                if(!doc.$set.purch) {
                    doc.$set.purchasing = 0;
                    doc.$set.copiesPurchas = 0;
                    doc.$set.purchasingadmin=0;
                    doc.$set.profit=0;
                }
                //else {
                //
                //    doc.$set.profit=doc.purchasing-doc.purchasingadmin;
                //{
                //   if (doc.$set.purch && doc.$set.purchasing == 0 && doc.$set.copiesPurchas == 0)
                //      // SimpleSchema.messages({m: "Wrong password"});
                //myContext.addInvalidKeys([{name: "password", type: "wrongPassword"}]);
                //}
                //}

                return doc;
            }
    },

    onSuccess:
        function(formType, result) {
            $('#updateModal').modal('hide')
            var data = Books.findOne({_id: Session.get('bookID')});
            var title = "تم تعديل الكتاب";
            var msg = data.title;
            toastr.success(msg, title, {
                positionClass: "toast-top-center",
                timeOut: "500"
            })
        }
});
Template.UpdateBookForm.helpers({
    selectedBookDoc: function(){
        return Books.findOne({_id: Session.get('bookID')});
    }
});
AutoForm.hooks({
    insertBookForm :{
        //before:{
        //    insert:
        //        function(doc){
        //            if (doc.$set.purch)
        //            {
        //                doc.$set.profit = doc.purchasing - doc.purchasingadmin;
        //            }
        //        }
        //},
        onSuccess: function (formType, result) {
            Ratings.insert({bookId: result});
            sAlert.success('تم الإضافة بنجاح', {
                effect: 'genie', position: 'top-right',
                timeout: '1000', onRouteClose: false,
                stack: false, offset: '80px'
            });
        }
    }
});