import React from 'react';
import VolumeControl from './VolumeControl';
import './Mixer.scss';

class Mixer extends React.Component {
	constructor (props){
		super(props);
	}

	render () {
		return (
			<div className="row">
				<div className="col-md-6">
					<VolumeControl deck={this.props.decks[0].name} webaudio={this.props.webaudio}/>
				</div>
				<div className="col-md-6">
					<VolumeControl deck={this.props.decks[1].name} webaudio={this.props.webaudio}/>
				</div>
			</div>
		);
	}
}

export default Mixer;
