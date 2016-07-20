
Template.Contact.events({
    'click #btnContactUs':function(){
        var email = document.getElementById("email").value;
        var subject = document.getElementById("subject").value;
        var message = document.getElementById("message").value;

        Email.send({
            to: "sharekkitabi@gmail.com",
            from: email,
            subject: subject,
            text: message
        });
    }
})