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
		e.preventDefault();
		e.stopPropagation();

		let files = e.dataTransfer.files;
		let _this = this;

		this.props.webaudio.loadTrack(files, this.props.deckName, function(result) {
			if (result){
				_this.setState({
					trackName: result.name + ' ' + (result.size/1000000).toFixed(2) + 'mb'
				});
			}else{
				_this.setState({
					trackName: result.error
				});
			}
		});
	}

	componentDidMount () {
		this.drawDisk();
		// When the component is mounted, grab a reference and add a DOM listener;
		this.refs.canvas.addEventListener("drop", this.handleDrop);
		this.refs.canvas.addEventListener("dragover", this.handleDragOver);
	}

	componentWillUnmount () {
		// Make sure to remove the DOM listener when the component is unmounted
		this.refs.canvas.removeEventListener("drop", this.handleDrop);
		this.refs.canvas.removeEventListener("dragover", this.handleDragOver);
	}

	componentDidUpdate () {
		this.drawDisk();
	}

	render () {
		console.log()
		return (
			<div>
				<h4>{this.state.trackName}</h4>
				<audio ref="htmlaudio" id={this.props.deckName}></audio>
				<canvas ref="canvas" id={this.props.deckName} className="turntable" width="300px" height="238px"></canvas>
				<Transport {...this.props} />
			</div>
		);
	}
}


Turntable.propTypes = {
    deckName: React.PropTypes.string.isRequired
};

export default Turntable;
