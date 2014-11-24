/** @jsx React.DOM */
var React = require('react/addons');
var _ = require('underscore');
var Carousel = require('../common/carousel');
var AlbumActions = require('../../actions/albumActions');
var AlbumStore = require('../../stores/albumStore');

function getStoreState() {
    return {
        photos:AlbumStore.getAll()
    }
}

var Graphics = React.createClass({

    getInitialState: function()
    {
        return getStoreState();
    },

    componentWillMount: function()
    {
        AlbumActions.search("graphic design");
    },

    componentDidMount: function()
    {
        AlbumStore.addChangeListener(this.onChange);
    },

    onChange: function()
    {
        if(this.isMounted())
        {
            this.setState(getStoreState());
        }
    },

    render: function()
    {
        var carousel;
        if(!_.isEmpty(this.state.photos))
        {
            carousel = <Carousel photos={this.state.photos} />;
        }

        return (
            <div className="graphics-container">
                <h1>Graphics</h1>
                    {carousel}
            </div>
        );
    }
});

module.exports = Graphics;