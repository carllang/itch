import React from 'react';


class CrossFader extends React.Component {

	constructor (props) {
		super(props);
		this.crossFade = this.crossFade.bind(this);
		this.state = {gainB: 0.5};
		this.props.webaudio.crossFadeGainNode['deckA'].gain.value = this.state.gainB;
		this.props.webaudio.crossFadeGainNode['deckB'].gain.value = this.state.gainB;
	}

	crossFade (event) {
		this.setState({gainB: event.target.value});
		// equal-power crossfade
		var gainA = Math.cos(event.target.value * 0.5*Math.PI);
		var gainB = Math.cos((1.0-event.target.value) * 0.5*Math.PI);
		this.props.webaudio.crossFadeGainNode['deckA'].gain.value = gainA;
		this.props.webaudio.crossFadeGainNode['deckB'].gain.value = gainB;
	}

	render () {
		return (
			<div>
				<input type="range" value={this.state.gainB} name="cross-fader" min="0" max="1" step="0.01" onChange={this.crossFade} />
			</div>
		);
	}
}

export default CrossFader;
