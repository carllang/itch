import React from 'react';
import VolumeControl from './VolumeControl';
import CrossFader from './CrossFader';
import './Mixer.scss';
import Knob from './Knob';



class Mixer extends React.Component {

	constructor (props){
		super(props);
	}

	render () {
		return (
			<div>
				<div className="row">
					<div className="col-md-6">
						<VolumeControl deck={this.props.decks[0].name} webaudio={this.props.webaudio}/>
						{/*<Knob value={5} onChangeValue={this.handleChange} />*/}
					</div>
					<div className="col-md-6">
						<VolumeControl deck={this.props.decks[1].name} webaudio={this.props.webaudio}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<CrossFader {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}

export default Mixer;
