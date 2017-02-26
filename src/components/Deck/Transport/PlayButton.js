import React from 'react';

class PlayButton extends React.Component {

	constructor (props) {
		super (props);
		this.togglePlaybackSpinUpDown = this.togglePlaybackSpinUpDown.bind(this);
		this.state = {
			isPlaying: false
		}
		this.sourceNode = null;

	}

	togglePlaybackSpinUpDown () {
		let audioCtx = this.props.webaudio.audioContext;
		let webAudio = this.props.webaudio;
		let now = this.props.webaudio.audioContext.currentTime;

		if (this.state.isPlaying) {
			//stop playing and return
			if (this.sourceNode) {  // we may not have a sourceNode, if our PBR is zero.
				let playback = this.sourceNode.playbackRate;
				playback.cancelScheduledValues( now );
				playback.setValueAtTime( playback.value, now );
				playback.linearRampToValueAtTime( 0.001, now+1 );
				this.props.webaudio.trackProperties[this.props.deckName].stopTime = now;
				this.sourceNode.stop( now + 2 );
				this.sourceNode = null;
				this.props.webaudio.trackProperties[this.props.deckName].lastBufferTime = now + 1;
			}

			this.setState({
				isPlaying: false
			});
			console.log('STOP!');
			return false;
		}
		let sourceNode = audioCtx.createBufferSource();
		sourceNode.buffer = this.props.webaudio.source[this.props.deckName].buffer;
		sourceNode.loop = false;
		// The "now" below causes issues in FFnightly
		sourceNode.playbackRate.setValueAtTime( 0.001, now );
		sourceNode.playbackRate.linearRampToValueAtTime( 1.0, now + 1 );

		sourceNode.connect( this.props.webaudio.filters[this.props.deckName]['lp'].filter );
		this.props.webaudio.filters[this.props.deckName]['lp'].filter.connect(this.props.webaudio.filters[this.props.deckName]['bp'].filter);
		this.props.webaudio.filters[this.props.deckName]['bp'].filter.connect(this.props.webaudio.filters[this.props.deckName]['hp'].filter);
		this.props.webaudio.filters[this.props.deckName]['hp'].filter.connect(this.props.webaudio.gainNode[this.props.deckName]);
		this.props.webaudio.gainNode[this.props.deckName].connect(this.props.webaudio.crossFadeGainNode[this.props.deckName]);

		this.props.webaudio.crossFadeGainNode[this.props.deckName].connect(this.props.webaudio.masterGain);
		//this.props.webaudio.masterGain.connect(this.props.webaudio.analyser);

		// connect the source to the analyser and the splitter
		// So basically source can connect to analyser and can be seperate chain for visualiser to output
		this.props.webaudio.crossFadeGainNode[this.props.deckName].connect(this.props.webaudio.splitter[this.props.deckName]);
		this.props.webaudio.splitter[this.props.deckName].connect(this.props.webaudio.analyser[this.props.deckName],0,0);
        this.props.webaudio.splitter[this.props.deckName].connect(this.props.webaudio.analyser2[this.props.deckName],1,0);
		this.props.webaudio.analyser[this.props.deckName].connect(this.props.webaudio.javascriptNode[this.props.deckName]);
		this.props.webaudio.javascriptNode[this.props.deckName].connect(audioCtx.destination);

		this.props.webaudio.masterGain.connect(audioCtx.destination);

		//this.props.deck.sourceNode = sourceNode;
		this.props.webaudio.trackProperties[this.props.deckName].currentPlaybackRate = 4.0;
		this.setState({
			isPlaying: true
		});

		this.props.webaudio.trackProperties[this.props.deckName].lastTimeStamp = now + 0.5;		// the 0.5 is to make up for the initial 1s "spin-up" ramp.
		this.props.webaudio.trackProperties[this.props.deckName].offset = this.props.webaudio.trackProperties[this.props.deckName].lastBufferTime;
		this.props.webaudio.trackProperties[this.props.deckName].restartTime = now;
		this.props.webaudio.trackProperties[this.props.deckName].stopTime = 0.0;
		this.props.webaudio.trackProperties[this.props.deckName].lastPBR = this.props.webaudio.trackProperties[this.props.deckName].currentPlaybackRate;
		sourceNode.start(now, this.props.webaudio.trackProperties[this.props.deckName].lastBufferTime);
		this.sourceNode = sourceNode;
		return true;
	}

	render () {
		return (
			<button onClick={this.togglePlaybackSpinUpDown}>
				<span className={((this.state.isPlaying)? 'active' : '') + ' play button glyphicon glyphicon-play'} ></span>
			</button>
		);
	}
}

export default PlayButton;
