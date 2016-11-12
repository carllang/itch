import React from 'react';

class PlayButton extends React.Component {

	constructor (props) {
		super (props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick () {
		this.props.track.play(this.props.name);
	}

	render () {
		return (
			<button onClick={this.handleClick}>
				<span className="play button glyphicon glyphicon-play" ></span>
			</button>
		);
	}
}

export default PlayButton;
