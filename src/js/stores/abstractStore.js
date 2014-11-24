var EventEmitter = require('events').EventEmitter;
var flickr = require('../api/flickr');

function AbstractStore() {

    this._data = {};
    this._default_arg = {};
    this._arg = this._default_arg;
    this._selected = "";
    this._dispatcherIndex = "";
    this.CHANGE_EVENT = "change";

    EventEmitter.call(this);

    this.emitChange = function()
    {
        this.emit(this.CHANGE_EVENT);
    };

    this.addChangeListener = function(callback) {

        this.on(this.CHANGE_EVENT, callback);
    };

    this.getAll =  function() {
        return this._data;
    };

    this.getSelected = function()
    {
        return this._selected;
    };

    this.getArg = function()
    {
        return this._arg;
    };

    this.isLoading = function()
    {
        return this._loading;
    };

    this.getDispatcherId = function()
    {
        return this._dispatcherIndex;
    };

    this.handleAction = function()
    {
        console.log("Subclasses must implement how to handle their own actions.");
    };

    this.clear = function()
    {
        this._data = {};
        this._selected = "";
        this._arg = this._default_arg;
        this.emitChange();
    };

    this.refresh = function() {
        this._loading = true;
        this.emitChange();
        flickr.get(this._arg, function(data) {
            this._data = data;
            this._loading = false;
            this.emitChange();
        }.bind(this));
    };
}

AbstractStore.prototype = new EventEmitter();
AbstractStore.constructor = AbstractStore;

module.exports = AbstractStore;