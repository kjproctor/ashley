/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');

var Menu = React.createClass({
	getDefaultProps: function()
	{
		return {
			menuName:'',
			menuItems:{}
		};
	},
	
	render: function()
	{
		var items = this.props.menuItems;
		var menuItemNodes = [];
		if(!_.isEmpty(items))
		{   
			for(var key in items)
			{
				var menuKey = "menuItem"+key;
			    menuItemNodes.push(<li key={menuKey}><Link to={key} tabIndex="-1" onClick={this.onClick} data-menu={key}>{items[key]}</Link></li>);
			}
		}
		return (
		     <div className="drop-down-menu-container">
			 	<ul className="nav navbar-nav">
			 		<li><a onClick={this.onClick}>{this.props.menuName}</a></li>
						<div ref="menuItemContainer" className="menu-item-container collapse" onMouseLeave={this.onMouseLeave}>
							{menuItemNodes}
						</div>
				</ul>
			</div>				
		);
	},
	
	onClick: function()
	{
		this.toggleCollapse();
	},
	
	onMouseLeave: function()
	{
		this.toggleCollapse();
	},
	
	
	toggleCollapse: function() 
	{
		var menuItemNode = this.refs.menuItemContainer.getDOMNode();
    	if(menuItemNode.className == "menu-item-container collapse")
		{
			menuItemNode.className = "menu-item-container expand";
		}
		else if(menuItemNode.className =="menu-item-container expand")
		{
			menuItemNode.className = "menu-item-container collapse";
		}
	}
	
});

module.exports = Menu;
