/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
window.$ = $;
var Route = Router.Route;
var Routes = Router.Routes;
var Navigation = require('./components/common/navigation');
var Photography = require('./components/portfolio/photography');
var WebDesign = require('./components/portfolio/webdesign');
var Graphics = require('./components/portfolio/graphics');

var App = React.createClass({
                                render: function ()
                                {
                                    return (
                                            <div>
											   <Navigation />
											   <div className="app-dock">
                                               		{this.props.activeRouteHandler()}
                                               </div> 
                                            </div>
                                            );
                                }
                            });
							
var routes = (
        <Routes>
            <Route handler={App}>
                <Route name="photography" path="/Portfolio/Photography" handler={Photography}/>
				<Route name="webDesign" path="/Portfolio/WebDesign" handler={WebDesign}/>
				<Route name="graphics" path="/Portfolio/Graphics" handler={Graphics}/>
            </Route>
        </Routes>
        );							

React.render(routes, document.body);