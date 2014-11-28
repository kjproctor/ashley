/** @jsx React.DOM */
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var _ = require('underscore');
var CarouselImage = require('./carouselImage');

//@todo see http://codepen.io/makenosound/pen/rstvx
var Carousel = React.createClass({

    getDefaultProps: function()
    {
        return {
            photos:[],
            totalCount:0
        };
    },

    getInitialState: function()
    {
        return {
            image:1
        };
    },

    componentDidMount: function()
    {
        this.determineButtonState();
    },

    componentDidUpdate: function()
    {
       this.determineButtonState();
    },

    determineButtonState: function()
    {
        var totalCount = this.getTotalCount();
        var prevBtn = this.refs.prev.getDOMNode();
        var nextBtn = this.refs.next.getDOMNode();
        if(this.state.image <= 1)
        {
            prevBtn.className = "previous none";
        }
        else
        {
            prevBtn.className = "previous";
        }
        if(this.state.image >= totalCount)
        {
            nextBtn.className = "next none";
        }
        else
        {
            nextBtn.className = "next";
        }

    },

    getTotalCount: function()
    {
       return this.props.photos.photoset.photo ? this.props.photos.photoset.photo.length : 0;
    },

    render: function()
    {
        var imageSources = this.getImageSources();
        var imageSource;
        var transitionBody;
        if(!_.isEmpty(imageSources))
        {
            imageSource = imageSources[this.state.image-1];
        }
        if(imageSource != null)
        {
            transitionBody =  (<div>
                                    <div className="col-xs-4">
                                        <span onClick={this.handlePrevious} className="previous" ref="prev"><i className="glyphicon glyphicon-chevron-left"></i></span>
                                    </div>
                                    <div className="col-xs-4">
                                        <ReactTransitionGroup transitionName="carousel" className="animated-image">
                                            <CarouselImage imageSrc={imageSource} />
                                        </ReactTransitionGroup>
                                    </div>
                                    <div className="col-xs-4 right">
                                        <span onClick={this.handleNext} className="next" ref="next"><i className="glyphicon glyphicon-chevron-right"></i></span>
                                    </div>
                                 </div>);
        }
        return (
            <div className="carousel">
                {transitionBody}
            </div>
        );
    },

    handleNext: function()
    {
        if(this.state.image < this.getTotalCount())
        {
            this.setState({image: this.state.image + 1});
        }
    },

    handlePrevious: function()
    {
        if(this.state.image <= this.getTotalCount() && this.state.image > 1)
        {
            this.setState({image: this.state.image - 1});
        }
    },

    getImageSources: function()
    {
        var imageSources = [];
        var photoset = this.props.photos.photoset;
        var photos = [];
        if(!_.isEmpty(photoset))
        {
            if(!_.isEmpty(photoset.photo))
            {
                photos = photoset.photo;
            }
        }
        ////https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        if(!_.isEmpty(photos))
        {
            for(var i=0; i<photos.length; i++)
            {
                var photo = photos[i];
                var imageSource = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg";
                imageSources.push(imageSource);
            }
        }
        return imageSources;
    }
});

module.exports = Carousel;