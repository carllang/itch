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

	// updateTurntable = function( drawOnScreen ) {
	//     var now = audioCtx.currentTime;
	//     var bufferTime;
	//     var keepAnimating = this.isPlaying;
	//
	// 	if (!this.isPlaying) {
	// 		if (this.stopTime) {	// still in spin-down;
	// 			if (now > (this.stopTime + 1) ) {	// done spinning down.
	// 				this.lastBufferTime = this.lastBufferTime + 0.5;
	// 				this.stopTime = 0;
	// 				return false;
	// 			} else {
	// 				// bufferTime = 1/2 acceleration * t^2;  // keeping acceleration = 1 simplifies this!!
	// 				bufferTime = 1 - (now-this.stopTime);
	// 				bufferTime = bufferTime * bufferTime;
	// 				bufferTime = bufferTime / 2;
	// 				bufferTime = 0.5 - bufferTime + this.lastBufferTime;
	// 				keepAnimating = true;
	// //				console.log( "now:" + now + " stopTime:" + this.stopTime + " bufferTime:" + bufferTime + " this.lastBufferTime:" + this.lastBufferTime );
	// 			}
	// 		} else
	// 			bufferTime = this.lastBufferTime;
	// 	} else if ((this.restartTime + 1) > now) {	// we're still in "spin-up"
	// 		// bufferTime = 1/2 acceleration * t^2;  // acceleration = 1
	// 		bufferTime = now-this.restartTime;
	// 		bufferTime = bufferTime * bufferTime;
	// 		bufferTime = bufferTime / 2;
	// 		bufferTime += this.offset;
	//     } else {
	// 		this.updateTime( now );
	// 		bufferTime = this.lastBufferTime;
	// 	}
	//
	// 	if (drawOnScreen) {
	// 		var radians = ((bufferTime * REVPERSEC) % 1) * 2 * Math.PI;
	// 		var context = this.platterContext;
	//
	// 		context.clearRect(-150,-150,300,300);  // TODO: shouldn't hardcode
	//
	//       	context.rotate( radians );
	// 		context.fillStyle = "white";
	// 		context.fillText("wubwubwub",-61,8);
	//       	context.rotate( -radians );
	//
	// 		if (this.buffer) {
	// 			// Now draw the position in the buffer
	//
	// 			var w = this.trackDisplayCanvas.width;
	// 			var h = this.trackDisplayCanvas.height;
	// 			var ctx = this.trackDisplayCanvas.getContext('2d');
	// 			ctx.clearRect(0,0,w,h);
	// 		    ctx.drawImage( this.bufferCanvas, 0, 0 );
	// 			var boxWidth = w * bufferTime / this.buffer.duration;
	// 			ctx.fillStyle = "rgba(255,255,255,0.33)";
	// 			ctx.fillRect(0,0,boxWidth,h);
	//
	// 			for (var i=0; i<4; i++) {
	// 				var cue = this.cues[i];
	// 				if (cue ) {
	// 					var x = cue.time / this.buffer.duration * w;
	// 					ctx.fillStyle = cueColors[i];
	// 					ctx.fillRect( x, 0, 1, h );
	// 					ctx.font = "12px bold Skia, Arial, sans-serif";
	// 					ctx.fillText( cueText[i], x+2, h/4 );
	// 				}
	// 			}
	//
	// 			drawRunningDisplay( runningDisplayContext, this.waveformDisplayCache, bufferTime );
	//
	// 		    // draw the center bar
	// 		    var isTop = this.isLeftTrack;
	// 		    ctx = runningDisplayContext;
	// 		    runningDisplayContext.fillStyle = "gray";
	// 		    runningDisplayContext.fillRect(RUNNING_DISPLAY_HALF_WIDTH,isTop?0:RUNNING_DISPLAY_HALF_HEIGHT,1,RUNNING_DISPLAY_HALF_HEIGHT);
	//
	// 			// draw cues on the running display
	// 			var begin = bufferTime - (SECONDS_OF_RUNNING_DISPLAY/2);
	// 			var end = begin + SECONDS_OF_RUNNING_DISPLAY;
	// 			for (var i=0; i<4; i++) {
	// 				var cue = this.cues[i];
	// 				if (cue && (cue.time>begin) && (cue.time<end)) {
	// 					var x = (cue.time-begin) * RUNNING_DISPLAY_WIDTH / SECONDS_OF_RUNNING_DISPLAY;
	// 					ctx.fillStyle = cueColors[i];
	// 					ctx.fillRect( x, isTop ? 0 : RUNNING_DISPLAY_HALF_HEIGHT, 1, RUNNING_DISPLAY_HALF_HEIGHT );
	// 					ctx.font = "12px bold Skia, Arial, sans-serif";
	// 					ctx.fillText( cueText[i], x+2, isTop ? RUNNING_DISPLAY_HALF_HEIGHT/2 : RUNNING_DISPLAY_HALF_HEIGHT*1.5 );
	// 				}
	// 			}
	//
	// 		}
	// 	}
	//
	// 	return keepAnimating;	// "keep animating" - may need to check if !isplaying
	// }

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
		//console.log()
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
