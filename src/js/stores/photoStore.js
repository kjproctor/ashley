var AbstractStore = require("./abstractStore");
var AppDispatcher = require('../appDispatcher');
var PhotoActions = require('../actions/photoActions');
var AlbumActions = require('../actions/albumActions');
var AlbumStore = require('./albumStore');

var PhotoStore = function()
{
    AbstractStore.call(this);
    this._default_arg = {method:"flickr.photosets.getPhotos"};
    this._arg = this._default_arg;

    this.getAll =  function() {
        return this._data.photoset;
    };

    this.handleAction = function(payload)
    {
        var action = payload.action;
        switch(action.actionType) {
            case PhotoActions.REFRESH:
                this.refresh();
                break;
            case PhotoActions.SELECT:
                this._selected = action.id;
                this.emitChange();
                break;
            case AlbumActions.SELECT:
                AppDispatcher.waitFor([AlbumStore.getDispatcherId()]);
                console.debug("PhotoStore AlbumActions.SELECT", AlbumStore.getSelected());
                this._arg.photoset_id = AlbumStore.getSelected();
                this.refresh();
                break;
            default:
            // do nothing
        }
        return true;
    };

    this._dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
};

PhotoStore.prototype = new AbstractStore();
PhotoStore.constructor = PhotoStore;
//make this a singleton
module.exports = exports = new PhotoStore();