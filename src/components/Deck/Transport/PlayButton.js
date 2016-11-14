import React from 'react';

class PlayButton extends React.Component {

	constructor (props) {
		super (props);
		this.togglePlayPause = this.togglePlayPause.bind(this);
	}

	// handleClick () {
	// 	this.props.webaudio.togglePlayPause(document.querySelector('#' + this.props.deckName));
	// }

	togglePlayPause () {
		let audioElement = document.querySelector('#' + this.props.deckName)
		if (audioElement.paused){
			audioElement.play();
		}else{
			audioElement.pause();
		}
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
