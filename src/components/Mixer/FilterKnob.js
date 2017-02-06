import React from 'react';
import ReactKnob from 'react-canvas-knob';

class Knob extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: 10000};
	}

	handleChange = (newValue) => {
		this.setState({value: newValue});
		this.props.webaudio.filters[this.props.deck][this.props.filter].filter[this.props.filterProperty].value = newValue;
	};

	componentDidMount() {
		this.setState({value: 10000});
	}

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
				thickness={0.5}
				displayInput={true}
				angleArc={270}
				angleOffset={225}
				step={10}
				fgColor={'#228DFF'}
				bgColor={'#000000'}
				inputColor={'#ffffff'}
				cursor={20}
				/>
		);
	}

}

export default Knob;
