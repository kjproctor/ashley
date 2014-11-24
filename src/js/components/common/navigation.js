/** @jsx React.DOM */
var React = require('react');

var Menu = require('./menu');

var Navigation = React.createClass({
                                render: function ()
                                {		
                                  return(
								         <nav className="navbar navbar-custom" role="navigation">
        									<div className="container">
            									<div className="navbar-left">
                									<img src="/images/logo-left-nav.png"/>
            									</div>
            									<div className="navbar-right">
													<ul className="nav navbar-nav">
														<li><a href="#">Home</a></li>
													</ul>
													<Menu menuName="Portfolio" menuItems={{"photography":"Photography", "webDesign":"Web Design", "graphics":"Graphics"}} />
													<ul className="nav navbar-nav">
														<li><a href="#">Contact</a></li>
													</ul>
            									</div>
        									</div>
    									</nav>
										);          
                                }
								
                            });
module.exports = Navigation;