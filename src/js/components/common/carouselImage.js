/** @jsx React.DOM */
var React = require('react/addons');
var $ = require('jquery');

var CarouselImage = React.createClass({
        getDefaultProps: function()
        {
            return {
                imageSrc:''
            };
        },

        render: function()
        {
            return (
                        <img ref="carouselImage" className="carousel-image" src={this.props.imageSrc} key={this.props.imageSrc} />
                    );
        },

        componentDidMount: function()
        {
            this.fadeIn();
        },

        componentDidUpdate: function()
        {
           this.fadeIn();
        },

        fadeIn: function()
        {
            var $el = $(this.refs.carouselImage.getDOMNode());
            $el.fadeIn();
        }

});

module.exports = CarouselImage;