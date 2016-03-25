/**
 * Created by omar on 2/18/16.
 */


var imageStore = new FS.Store.GridFS("images", {});

Images = new FS.Collection("images", {
    stores: [imageStore]
});

Images.allow({
    insert: function () {
        return true
    },
    download: function () {
        return true
    }
})