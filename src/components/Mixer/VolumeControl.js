import React from 'react';

class VolumeControl extends React.Component {
	constructor (props) {
		super(props);
	}

	handleChange (event) {
		console.log('range ', event.target.value);
	}

	render () {
		return(
			<div>
				<input type="range" min="0" max="11" orient="vertical" step="1" onChange={this.handleChange} />
			</div>
		);
	}
}

export default VolumeControl;
