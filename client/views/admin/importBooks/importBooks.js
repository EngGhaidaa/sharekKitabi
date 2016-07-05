/**
 * Created by omar on 6/28/16.
 */
Template.importBooks.onCreated( () => {
    Template.instance().uploading = new ReactiveVar( false );
});

Template.importBooks.helpers({
    uploading() {
    return Template.instance().uploading.get();
}
});

Template.importBooks.events({
    'change [name="uploadCSV"]' ( event, template ) {
        template.uploading.set( true );

        Papa.parse( event.target.files[0], {
            header: true,
            complete( results, file ) {
                Meteor.call( 'parseUpload', results.data, ( error, response ) => {
                    if ( error ) {
                        console.log( error.reason );
                    }
                    else {
                        template.uploading.set( false );
                        //Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
                    }
                });
            }
        });
    }
});