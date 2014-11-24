var _ = require('underscore');
var flickr = require('../api/flickr');
var AbstractStore = require("./abstractStore");
var AppDispatcher = require('../appDispatcher');
var AlbumActions = require('../actions/albumActions');

var AlbumStore = function()
{
    AbstractStore.call(this);
    this._findAlbumsByPhotsetId = "flickr.photosets.getPhotos";
    this._findAllAlbums = "flickr.photosets.getList";
    this._default_arg = {method:this._findAllAlbums, user_id:"129054603@N02"};
    this._arg = this._default_arg;
    this._albumName = "";
    this._albumId = "";

    this.refresh = function() {
        this._loading = true;
        this.emitChange();
        flickr.get(this._arg, function(data) {
            this._data = data;
            this._loading = false;
            this.emitChange();
        }.bind(this));
    };

    this.search = function() {
        this._loading = true;
        this.emitChange();
        this._arg.method=this._findAllAlbums;
        flickr.get(this._arg, function(data) {
            this._data = data;
            this.onReceiveAllAlbums();
        }.bind(this));
    };

    this.findAlbumById = function() {
        this._arg.method=this._findAlbumsByPhotsetId;
        this._arg.photoset_id = this._albumId;
        flickr.get(this._arg, function(data) {
            this._data = data;
            this._loading = false;
            this.emitChange();
        }.bind(this));
    };

    this.onReceiveAllAlbums = function()
    {
       if(!_.isEmpty(this._data))
       {
           var photosets = this._data.photosets.photoset;
           if(!_.isEmpty(photosets))
           {
               for (var i = 0; i < photosets.length; i++) {
                   if (photosets[i].title._content == this._albumName) {
                       this._albumId = photosets[i].id;
                       break;
                   }
               }
               this.findAlbumById();
           }
       }
    };

    this.handleAction = function(payload)
    {
        var action = payload.action;
        switch(action.actionType) {
            case AlbumActions.REFRESH:
                this.refresh();
                break;
            case AlbumActions.SEARCH_BY_ALBUM_NAME:
                this._albumName = action.albumName;
                this.search();
                break;
            default:
            // do nothing
        }
        return true;
    };

    this._dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
};

AlbumStore.prototype = new AbstractStore();
AlbumStore.constructor = AlbumStore;
//make this a singleton
module.exports = exports = new AlbumStore();