import React from 'react';

class StopButton extends React.Component {

	constructor (props) {
		super (props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		this.props.track.stop(this.props.name);
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
