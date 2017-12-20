import React from 'react';


class VUmeter extends React.Component{

	constructor (props) {
		super(props);
	}

	drawVUmeter () {

		let _this = this;
		_this.props.webaudio.javascriptNode[_this.props.deck].onaudioprocess = function() {

			// get the average for the first channel
			var array =  new Uint8Array(_this.props.webaudio.analyser[_this.props.deck].frequencyBinCount);
			_this.props.webaudio.analyser[_this.props.deck].getByteFrequencyData(array);
			var average = _this.getAverageVolume(array);

			// get the average for the second channel
			var array2 =  new Uint8Array(_this.props.webaudio.analyser2[_this.props.deck].frequencyBinCount);
			_this.props.webaudio.analyser2[_this.props.deck].getByteFrequencyData(array2);
			var average2 = _this.getAverageVolume(array2);

			this.c = _this.refs.uvmeter;
			this.ctx = this.c.getContext("2d");
			// clear the current state
			this.ctx.clearRect(0, 0, 12, 150);

			// VU gradient
			var grd = this.ctx.createLinearGradient(0,100,12,150);
			grd.addColorStop(0, 'red');
			grd.addColorStop(0.10 , 'yellow');
			grd.addColorStop(1, 'green');
			// grd.addColorStop(0.6, _this.props.color);
			// grd.addColorStop(1, _this.props.color);

			// set the fill style
			this.ctx.fillStyle=grd;
			//this.ctx.fillStyle = '#ffffff';
			// create the meters
			this.ctx.fillRect(0,150-average,5,150);
			this.ctx.fillRect(7,150-average2,5,150);
			this.ctx.fill();

		}
	}

	getAverageVolume (array) {
		let values = 0;
		let average;

		let length = array.length;

		// get all the frequency amplitudes
		for (let i = 0; i < length; i++) {
			values += array[i];
		}

		average = values / length;
		return average;
	}

	componentDidUpdate () {
		this.drawVUmeter();
	}

	componentDidMount () {
		this.drawVUmeter();
	}

	render () {
		return (
			<div>
				<div>
					<canvas ref="uvmeter" width="20px" height="150px"></canvas>
				</div>
			</div>
		);
	}
}


export default VUmeter;
