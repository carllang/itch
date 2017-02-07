import React from 'react';


class UVmeter extends React.Component{

	constructor (props) {
		super(props);
	}

	drawUVmeter () {

		let _this = this;
		this.props.webaudio.javascriptNode.onaudioprocess = function() {

			// get the average for the first channel
			var array =  new Uint8Array(_this.props.webaudio.analyser.frequencyBinCount);
			_this.props.webaudio.analyser.getByteFrequencyData(array);
			var average = _this.getAverageVolume(array);

			// get the average for the second channel
			var array2 =  new Uint8Array(_this.props.webaudio.analyser2.frequencyBinCount);
			_this.props.webaudio.analyser2.getByteFrequencyData(array2);
			var average2 = _this.getAverageVolume(array2);

			this.c = _this.refs.uvmeter;
			this.ctx = this.c.getContext("2d");
			// clear the current state
			this.ctx.clearRect(0, 0, 12, 200);

			var grd = this.ctx.createLinearGradient(0,100,12,200);



			grd.addColorStop(0, 'red');
			grd.addColorStop(0.25 , 'yellow');
			grd.addColorStop(0.75, 'green');
			grd.addColorStop(1, '#228DFF');
			// set the fill style
			this.ctx.fillStyle=grd;
			//this.ctx.fillStyle = '#ffffff';
			// create the meters
			this.ctx.fillRect(0,200-average,5,200);
			this.ctx.fillRect(7,200-average2,5,200);
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
		this.drawUVmeter();
	}

	componentDidMount () {
		this.drawUVmeter();
	}

	render () {
		return (
			<div>
				<h4>UV Meter</h4>
				<div>
					<canvas ref="uvmeter" width="200px" height="200px"></canvas>
				</div>
			</div>
		);
	}


}


export default UVmeter;
