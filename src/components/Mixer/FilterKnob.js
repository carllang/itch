import React from 'react';
import ReactKnob from 'react-canvas-knob';

class Knob extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: 5};
	}

	handleChange = (newValue) => {
		this.setState({value: newValue});
		this.props.webaudio.filters[this.props.deck][this.props.filter].filter.frequency.value = newValue;
	};

	render() {
		return (
			<ReactKnob
				value={this.state.value}
				onChange={this.handleChange}
				min={this.props.min}
				max={this.props.max}
				width={this.props.width}
				height={this.props.height}
				stopper={true}
				lineCap={'butt'}
				thickness={0.2}
				displayInput={false}
				angleArc={270}
				angleOffset={225}
				step={0.1}
				fgColor={'#228DFF'}
				bgColor={'#404E5C'}
				inputColor={'#0000ff'}
				/>
		);
	}

}

export default Knob;
