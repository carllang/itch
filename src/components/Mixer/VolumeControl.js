import React from 'react';


class VolumeControl extends React.Component {

	constructor (props) {
		super(props);
		this.changeVolume = this.changeVolume.bind(this);
	}

	changeVolume (event) {
		this.props.webaudio.gainNode[this.props.deck].gain.value =  event.target.value;
	}

	render () {
		return(
			<div>
				<input type="range" min="0" max="1" name="volume-fader" step="0.01" onChange={this.changeVolume} />
			</div>
		);
	}
}

export default VolumeControl;
