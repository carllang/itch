import React from 'react';

class ForwardButton extends React.Component {

	constructor (props) {
		super(props);
	}

	handleClick () {
		this.props.dispatch(forward());
	}

	render () {
		return (
			<div className="forward button" onClick={this.handleClick}>Forward</div>
		);
	}
}
