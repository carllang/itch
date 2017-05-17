import React from 'react';
import VolumeControl from './VolumeControl';
import CrossFader from './CrossFader';
import { themeHilightColour } from './Mixer.scss';
import FilterKnob from './FilterKnob';
import { VUmeter } from '../Visualizer';


class Mixer extends React.Component {

	constructor (props){
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
				<div className="row">
					<div className="col-md-6 mixer-knobs-contr">
						<FilterKnob min={-40} max={40} width={50} height={50} filter={'hp'} default={0} filterProperty={'gain'} deck={'deckA'} webaudio={this.props.webaudio} color={themeHilightColour}/>
						<FilterKnob min={-40} max={40} width={50} height={50} filter={'bp'} default={0} filterProperty={'gain'} deck={'deckA'} webaudio={this.props.webaudio} color={themeHilightColour}/>
						<FilterKnob min={-40} max={40} width={50} height={50} filter={'lp'} default={0} filterProperty={'gain'} deck={'deckA'} webaudio={this.props.webaudio} color={themeHilightColour}/>
					</div>
					<div className="col-md-6 mixer-knobs-contr">
						<FilterKnob min={-40} max={40} width={50} height={50} filter={'hp'} default={0} filterProperty={'gain'} deck={'deckB'} webaudio={this.props.webaudio} color={themeHilightColour}/>
						<FilterKnob min={-40} max={40} width={50} height={50} filter={'bp'} default={0} filterProperty={'gain'} deck={'deckB'} webaudio={this.props.webaudio} color={themeHilightColour}/>
						<FilterKnob min={-40} max={40} width={50} height={50} filter={'lp'} default={0} filterProperty={'gain'} deck={'deckB'} webaudio={this.props.webaudio} color={themeHilightColour}/>
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
					<div className="col-md-6">
						<VUmeter webaudio={this.props.webaudio} deck="deckA" color={themeHilightColour}/>
					</div>
					<div className="col-md-6">
						<VUmeter webaudio={this.props.webaudio} deck="deckB" color={themeHilightColour}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-2">
					</div>
					<div className="col-md-8">
						<CrossFader gainB={this.state.gainB} crossFade={this.crossFade} />
					</div>
					<div className="col-md-2">
					</div>
				</div>
			</div>
		);
	}

}

export default Mixer;
