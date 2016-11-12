import React from 'react';
import Transport from './Transport';
import './Turntable.scss';

class Turntable extends React.Component {

	constructor (props) {
		super (props);
		this.state = {
			trackName: 'drop a track'
		};
		this.handleDrop = this.handleDrop.bind(this);
		this.handleDragOver = this.handleDragOver.bind(this);
	}

	drawDisk () {
		this.c = this.refs.canvas;
		this.ctx = this.c.getContext("2d");
		this.ctx.beginPath();
		this.ctx.arc(120,120,100,0,2*Math.PI);
		this.ctx.stroke();
		this.ctx.fillStyle = '#000000';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.arc(120,120,35,0,2*Math.PI);
		this.ctx.fillStyle = '#ffffff';
		this.ctx.fill();
		this.ctx.beginPath();
		this.ctx.arc(120,120,2,0,2*Math.PI);
		this.ctx.fillStyle = '#666666';
		this.ctx.fill();
		this.ctx.strokeStyle = '#666666';
		for (let i = 8; i < 20; i ++ ){
			this.ctx.beginPath();
			this.ctx.arc(120,120,i*5,0,2*Math.PI);
			this.ctx.stroke();
		}
	}

	handleDragOver (e) {
		e.preventDefault();
		e.stopPropagation();
	}

	handleDrop (e) {
		e.preventDefault()
		e.stopPropagation()
		let _this = this;
		let files = e.dataTransfer.files;

		//this.refs.canvas.style.display = 'block';
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			let reader = new FileReader();
			reader.addEventListener('load', function(e) {
				var data = e.target.result;
				_this.deckARecord = e.target.result;
				console.log('Yes you dropped it ', file.name);
				_this.setState({
					trackName: file.name
				});
			});
			reader.readAsArrayBuffer(file)
		}
	}

	componentDidMount() {
		this.drawDisk();
		// When the component is mounted, grab a reference and add a DOM listener;
		this.refs.canvas.addEventListener("drop", this.handleDrop);
		this.refs.canvas.addEventListener("dragover", this.handleDragOver);
	}

	componentWillUnmount() {
		// Make sure to remove the DOM listener when the component is unmounted
		this.refs.canvas.removeEventListener("drop", this.handleDrop);
		this.refs.canvas.removeEventListener("dragover", this.handleDragOver);
	}

	render () {
		return (
			<div>
				<h3>{this.state.trackName}</h3>
				<audio ref="htmlaudio" src=""></audio>
				<canvas ref="canvas" id={this.props.name} style={{width:300, height:238, backgroundColor: '#546A7B'}} width="300px" height="238px"></canvas>
				<Transport {...this.props} />
			</div>
		);
	}
}


Turntable.propTypes = {
    name: React.PropTypes.string.isRequired
};

export default Turntable;
