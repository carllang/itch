import React from 'react';

class PlayButton extends React.Component {

	constructor (props) {
		super (props);
		this.togglePlayPause = this.togglePlayPause.bind(this);
		this.state = {
			isPressed: false
		}
	}

	togglePlayPause () {
		let audioElement = document.querySelector('#' + this.props.deckName);
		(audioElement.paused)? audioElement.play() : audioElement.pause();
		this.setState({
			isPressed: audioElement.paused
		});
	}

	render () {
		return (
			<button onClick={this.togglePlayPause}>
				<span className={((this.state.isPressed)? 'active' : '') + ' play button glyphicon glyphicon-play'} ></span>
			</button>
		);
	}
}

export default PlayButton;
