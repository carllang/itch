import React from 'react';

class RewindButton extends React.Component {

	constructor (props) {
		super(props);
	}

	handleClick () {
		this.props.dispatch(rewind());
	}

	render () {
		return (
			<div className="rewind button" onClick={this.handleClick}>Rewind</div>
		);
	}
}
