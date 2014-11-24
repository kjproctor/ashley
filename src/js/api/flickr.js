var $ = require('jquery');

var _URL= "https://api.flickr.com/services/rest/" ;
var _KEY = "8665b4f928d59dc988399af13488b89e";
var _SECRET = "27feeab885af1f3c";

//https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=8665b4f928d59dc988399af13488b89e&photoset_id=72157646756303143&format=json&nojsoncallback=1
//See https://www.flickr.com/services/api/misc.urls.html
//https://farm8.staticflickr.com/7556/15687630452_f7004c776e.jpg
//https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
$.ajaxSettings.traditional = true;

var _ARG = {
    api_key: _KEY,
    format: 'json',
    nojsoncallback: 1
};

module.exports = {
	
    get: function(arg, callback) {
       return this.call(arg, callback, 'GET');
    },

    post: function(arg, callback) {
        return this.call(arg, callback, 'POST');
    },

    call: function(arg, callback, method) {
		this.mergeArg(arg);
        $.ajax({
                   method: method,
                   url: _URL,
                   data: arg,
                   dataType: 'json',
                   crossDomain: true,
                   success: callback,
                   error: function(xhr, status, err) {
                       console.error(this._URL, status, err.toString(), xhr.getAllResponseHeaders());
                   }.bind(this)
               });
    },
	 
	mergeArg: function(arg)
    {
        return $.extend(arg, _ARG);
    }


};
