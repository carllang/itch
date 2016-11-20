import React from 'react';


class Knob extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			value: this.props.value,
			degree: this.valueToRadian(this.props.value)
		}
	}

	valueToRadian(value) {
		return Math.round((value / 100) * 270);
	}


	handleChange(value) {
		// this.setState({
		// 	value: value,
		// 	degree: this.valueToRadian(value)
		// }, () => {
		// 	if (this.props.onChangeValue) {
		// 		this.props.onChangeValue(this.state.value)
		// 	}
		// })
	}

	render () {
		return (
			<div className="Knob">
				<div className="Knob-label">
					<input
						type="number"
						min={0}
						max={100}
						ref="knob"
						className="Knob-value"
						defaultValue={this.props.value}
						value={this.state.value}
						onChange={ this.handleChange()}
						/>
				</div>
				<div
					className="Knob-spinner"
					style={{
						transform: `rotate(${-45 + this.state.degree}deg)`
					}}
					>
				</div>
			</div>
		);
	}
}

export default Knob;
