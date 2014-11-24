var Dispatcher = require('flux').Dispatcher;
var copyProperties = require('react/lib/copyProperties');

var AppDispatcher = copyProperties(new Dispatcher(), {
    handleViewAction: function (action) {
        console.log("handleViewAction", action);
        this.dispatch({
                          source: 'VIEW_ACTION',
                          action: action
                      });
    }

});

module.exports = AppDispatcher;