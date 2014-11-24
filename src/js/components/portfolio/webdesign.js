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

var WebDesign = React.createClass({
    getInitialState: function()
    {
        return getStoreState();
    },

    componentWillMount: function()
    {
        AlbumActions.search("web development");
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
            <div className="webdesign-container">
                <h1>Web Design</h1>
                {carousel}
            </div>
        );
    }
});

module.exports = WebDesign;