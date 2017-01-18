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
						<FilterKnob min={0} max={20000} width={50} height={50} filter={'hp'} deck={this.props.decks[0].name} webaudio={this.props.webaudio} />
						<FilterKnob min={0} max={20000} width={50} height={50} filter={'bp'} deck={this.props.decks[0].name} webaudio={this.props.webaudio} />
						<FilterKnob min={0} max={20000} width={50} height={50} filter={'lp'} deck={this.props.decks[0].name} webaudio={this.props.webaudio} />
					</div>
					<div className="col-md-6 mixer-knobs-contr">
						<FilterKnob min={0} max={20000} width={50} height={50} filter={'hp'}  deck={this.props.decks[1].name} webaudio={this.props.webaudio} />
						<FilterKnob min={0} max={20000} width={50} height={50} filter={'bp'}  deck={this.props.decks[1].name} webaudio={this.props.webaudio} />
						<FilterKnob min={0} max={20000} width={50} height={50} filter={'lp'}  deck={this.props.decks[1].name} webaudio={this.props.webaudio} />
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
