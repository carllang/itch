import React from 'react';
import ReactKnob from 'react-canvas-knob';


class Knob extends React.Component {

	constructor(props) {
		super(props);
		this.state = {value: this.props.default};
	}

	handleChange = (newValue) => {
		this.setState({value: newValue});
		this.props.webaudio.filters[this.props.deck][this.props.filter].filter[this.props.filterProperty].value = newValue;
	};

	componentDidMount() {
		this.setState({value: this.props.default});
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
				step={1}
				fgColor={this.props.color}
				bgColor={'#000000'}
				inputColor={'#ffffff'}
				cursor={20}
				/>
		);
	}

}

export default Knob;
