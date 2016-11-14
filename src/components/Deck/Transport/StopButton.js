import React from 'react';

class StopButton extends React.Component {

	constructor (props) {
		super (props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		//this.props.webaudio.stop(this.props.deckName, document.querySelector('#' + this.props.deckName));
	}

	render () {
		return (
			<button onClick={this.handleClick}>
				<span className="stop button glyphicon glyphicon-stop"></span>
			</button>
		);
	}
}

export default StopButton;
