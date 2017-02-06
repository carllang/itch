import React from 'react';
import VolumeControl from './VolumeControl';
import CrossFader from './CrossFader';
import './Mixer.scss';
import FilterKnob from './FilterKnob';
import VUmeter from '../Visualizer';



class Mixer extends React.Component {

	constructor (props){
		super(props);
	}

	render () {
		return (
			<div>
				<div className="row">
					<div className="col-md-6 mixer-knobs-contr">
						<FilterKnob min={-25} max={25} width={50} height={50} filter={'hp'} filterProperty={'gain'} deck={'deckA'} webaudio={this.props.webaudio} />
						<FilterKnob min={500} max={5000} width={50} height={50} filter={'bp'} filterProperty={'frequency'} deck={'deckA'} webaudio={this.props.webaudio} />
						<FilterKnob min={-25} max={25} width={50} height={50} filter={'lp'} filterProperty={'gain'} deck={'deckA'} webaudio={this.props.webaudio} />
					</div>
					<div className="col-md-6 mixer-knobs-contr">
						<FilterKnob min={-25} max={25} width={50} height={50} filter={'hp'} filterProperty={'gain'} deck={'deckB'} webaudio={this.props.webaudio} />
						<FilterKnob min={0} max={20000} width={50} height={50} filter={'bp'} filterProperty={'frequency'} deck={'deckB'} webaudio={this.props.webaudio} />
						<FilterKnob min={-25} max={25} width={50} height={50} filter={'lp'} filterProperty={'gain'} deck={'deckB'} webaudio={this.props.webaudio} />
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<VolumeControl deck="deckA" webaudio={this.props.webaudio}/>
					</div>
					<div className="col-md-6">
						<VolumeControl deck="deckB" webaudio={this.props.webaudio}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<VUmeter webaudio={this.props.webaudio} deck="deckA"/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2">
					</div>
					<div className="col-md-8">
						<CrossFader {...this.props} />
					</div>
					<div className="col-md-2">
					</div>
				</div>
			</div>
		);
	}

}

export default Mixer;
