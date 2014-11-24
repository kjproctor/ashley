var AppDispatcher = require('../appDispatcher');

var PhotoActions = {
    SELECT: 'PHOTO_SELECT',
    REFRESH: 'PHOTO_REFRESH',
    select:function(id) {
        AppDispatcher.handleViewAction({ actionType:PhotoActions.SELECT, photoset_id:id });
    },
    refresh:function() {
        AppDispatcher.handleViewAction({ actionType:PhotoActions.REFRESH });
    }
};
module.exports = PhotoActions;