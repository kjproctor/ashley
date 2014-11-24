var AppDispatcher = require('../appDispatcher');

var AlbumActions = {
    SEARCH_BY_ALBUM_NAME: 'SEARCH_BY_ALBUM_NAME',
    REFRESH: 'ALBUM_REFRESH',
    search:function(albumName) {
        AppDispatcher.handleViewAction({ actionType:AlbumActions.SEARCH_BY_ALBUM_NAME, albumName:albumName });
    },
    refresh:function() {
        AppDispatcher.handleViewAction({ actionType:AlbumActions.REFRESH });
    }
};
module.exports = AlbumActions;