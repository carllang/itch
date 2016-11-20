import React from 'react';


class CrossFader extends React.Component {

	constructor (props) {
		super(props);
		this.crossFade = this.crossFade.bind(this);
	}

	crossFade (event) {
		// equal-power crossfade
		var gainA = Math.cos(event.target.value * 0.5*Math.PI);
		var gainB = Math.cos((1.0-event.target.value) * 0.5*Math.PI);
		this.props.webaudio.crossFadeGainNode['deckA'].gain.value = gainA;
		this.props.webaudio.crossFadeGainNode['deckB'].gain.value = gainB;
	}

	render () {
		return (
			<div>
				<input type="range" name="cross-fader" min="0" max="1" step="0.01" onChange={this.crossFade} />
			</div>
		);
	}
}

export default CrossFader;
