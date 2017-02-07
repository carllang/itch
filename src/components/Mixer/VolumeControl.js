import React from 'react';


class VolumeControl extends React.Component {

	constructor (props) {
		super(props);
		this.changeVolume = this.changeVolume.bind(this);
		this.state = {volumeUnit: 0.5};
		this.props.webaudio.gainNode[this.props.deck].gain.value = this.state.volumeUnit;
	}

	changeVolume (event) {
		this.props.webaudio.gainNode[this.props.deck].gain.value =  event.target.value;
		this.setState({volumeUnit: event.target.value});
	}


	render () {
		return(
			<div>
				<input type="range" min="0" max="1" name="volume-fader" step="0.05" value={this.state.volumeUnit} onChange={this.changeVolume} />
			</div>
		);
	}
}

export default VolumeControl;
