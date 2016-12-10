import React from 'react';

class PlayButton extends React.Component {

	constructor (props) {
		super (props);
		this.togglePlaybackSpinUpDown = this.togglePlaybackSpinUpDown.bind(this);
		this.state = {
			isPressed: false
		}
	}

	togglePlaybackSpinUpDown () {
		let audioElement = document.querySelector('#' + this.props.deckName);
		(audioElement.paused)? audioElement.play() : audioElement.pause();
		this.setState({
			isPressed: audioElement.paused
		});
	}

	togglePlaybackSpinUpDown () {
	    var now = audioCtx.currentTime;

	//	this.cuePointIsActive = false;

	    if (this.isPlaying) {
	        //stop playing and return
	        if (this.sourceNode) {  // we may not have a sourceNode, if our PBR is zero.
		        var playback = this.sourceNode.playbackRate;
		        playback.cancelScheduledValues( now );
		        playback.setValueAtTime( playback.value, now );
		        playback.linearRampToValueAtTime( 0.001, now+1 );
		        this.gainNode.gain.setTargetAtTime( 0, now+1, 0.01 );
		        this.stopTime = now;
	 		   	this.sourceNode.stop( now + 2 );
		        this.sourceNode = null;
		        this.gainNode = null;
	        }
	        this.isPlaying = false;
	        return false;
	    }

	    sourceNode = audioCtx.createBufferSource();
	    sourceNode.buffer = this.buffer;
	    sourceNode.loop = false;
	    // The "now" below causes issues in FFnightly
	    sourceNode.playbackRate.setValueAtTime( 0.001, now );
	    sourceNode.playbackRate.linearRampToValueAtTime( this.currentPlaybackRate, now+1 );

		this.gainNode = audioCtx.createGain();
		this.gainNode.connect( this.filter );
		this.gainNode.gain.value = this.gain;
	    sourceNode.connect( this.gainNode );

	    this.sourceNode = sourceNode;
	    this.isPlaying = true;
	    this.lastTimeStamp = now + 0.5;		// the 0.5 is to make up for the initial 1s "spin-up" ramp.
	    this.offset = this.lastBufferTime;
	    this.restartTime = now;
	    this.stopTime = 0.0;
	    this.lastPBR = this.currentPlaybackRate;

	    sourceNode.onended = shutDownNodeWhenDonePlaying.bind(this);
	    sourceNode.start( now, this.lastBufferTime );

	    return true;
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
