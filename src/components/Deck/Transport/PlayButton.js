import React from 'react';

class PlayButton extends React.Component {

	constructor (props) {
		super (props);
		this.togglePlayPause = this.togglePlayPause.bind(this);
	}

	togglePlayPause () {
		let audioElement = document.querySelector('#' + this.props.deckName);
		(audioElement.paused)? audioElement.play() : audioElement.pause();
	}

	render () {
		return (
			<button onClick={this.togglePlayPause}>
				<span className="play button glyphicon glyphicon-play" ></span>
			</button>
		);
	}
}

export default PlayButton;
