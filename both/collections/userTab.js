/**
 * Created by omar on 2/28/16.
 */
TabularTables = {};
TabularTables.Users = new Tabular.Table({
    name: "Users",
    collection: Users,
    columns: [
        {data: "profile.name", title: "اسم المستخدم", class: "col-md-3"},
        {
            tmpl: Meteor.isClient && Template.UserActionBtns, class: "col-md-1"
        }
    ],
    selector: function(userId  ) {
        return { _id: {$ne: userId} }
    }

});
//Users.helpers({
//    getUserName: function () {
//        if (Meteor.userId() != this._id) {
//            var user = Users.findOne(this._id);
//            if(user){
//                return user.profile.name;
//            }
//        }
//    }
//});
//Helpers.userFullName


//    <div class="row">
//    <div class='col-md-offset-2 col-md-8'>
//    <div class="row">
//    {{#each users}}
//<div class="col-md-4">
//    <h2>{{profile.name}}</h2>
//</div>
//{{/each}}
//</div>
//</div>
//</div>