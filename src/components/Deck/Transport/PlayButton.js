import React from 'react';

class PlayButton extends React.Component {

	constructor (props) {
		super (props);
		this.togglePlaybackSpinUpDown = this.togglePlaybackSpinUpDown.bind(this);
		this.state = {
			isPlaying: false
		}

	}

	togglePlaybackSpinUpDown () {
		let now = this.props.webaudio.audioContext.currentTime;

		let sourceNode = this.props.webaudio.audioContext.createBufferSource();
		sourceNode.buffer = this.props.webaudio.source[this.props.deckName].buffer;
		sourceNode.loop = false;
		// The "now" below causes issues in FFnightly
		//sourceNode.playbackRate.setValueAtTime( 1, now );
		//sourceNode.playbackRate.linearRampToValueAtTime( this.currentPlaybackRate, now + 1 );

		if (this.state.isPlaying) {
			//stop playing and return
			if (this.props.deck.sourceNode) {  // we may not have a sourceNode, if our PBR is zero.
				let playback = this.props.deck.sourceNode.playbackRate;
				playback.cancelScheduledValues( now );
				playback.setValueAtTime( playback.value, now );
				playback.linearRampToValueAtTime( 0.001, now+1 );
				this.props.deck.stopTime = now;
				this.props.deck.sourceNode.stop( now + 2 );
				this.props.deck.sourceNode = null;
			}

			this.setState({
				isPlaying: false
			});

			return false;
		}

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
		this.props.webaudio.javascriptNode[this.props.deckName].connect(this.props.webaudio.audioContext.destination);

		this.props.webaudio.masterGain.connect(this.props.webaudio.audioContext.destination);

		this.props.deck.sourceNode = sourceNode;
		this.props.deck.currentPlaybackRate = 1.0;
		this.setState({
			isPlaying: true
		});

		this.props.deck.lastTimeStamp = now + 0.5;		// the 0.5 is to make up for the initial 1s "spin-up" ramp.
		this.props.deck.offset = this.lastBufferTime;
		this.props.deck.restartTime = now;
		this.props.deck.stopTime = 0.0;
		this.props.deck.lastPBR = this.currentPlaybackRate;
		sourceNode.start(now, this.lastBufferTime);

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
