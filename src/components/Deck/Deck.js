import React from 'react';
import Transport from './Transport';
import './Deck.scss';
import {connect} from 'react-redux';
import {loadTrackDispatch}  from '../../actions/actionCreators';


class Deck extends React.Component {

	constructor (props) {
		super (props);

		this.state = {
			trackName: 'drop a track',
			deckName: this.props.deckName
		};

		// this.deck = {
		// 	gain: 1.0,
		// 	currentPlaybackRate: 1.0,
		// 	lastBufferTime: 0.0,
		// 	stopTime: 0.0
		// };

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

	handleDropBody (e){
		e.preventDefault();
		e.stopPropagation();
	}

	handleDrop (e) {
		e.preventDefault();
		e.stopPropagation();

		let files = e.dataTransfer.files;
		let _this = this;

		this.loadTrack(files, this.props.deckName, function(result) {
			if (result){

				let loader = {
							deckName: _this.props.deckName,
							trackName: result.name
						};

				_this.props.dispatch(loadTrackDispatch(loader));
				_this.setState({
					trackName: result.name
				});
			}else{
				_this.setState({
					trackName: result.error
				});
			}
		});
	}

	loadTrack (files, deckName, callback) {
		let _this = this;

			let file = files[0];
			let reader = new FileReader();

			reader.onloadstart = function (event) {
				_this.setState({
					trackName: 'loading...'
				});
			};

			reader.onload = function (event) {
		  		_this.props.webaudio.audioContext.decodeAudioData( event.target.result, function(buffer) {
					// if (thisTrack.isPlaying)
					// 	thisTrack.togglePlayback();
					_this.props.webaudio.source[_this.props.deckName] = _this.props.webaudio.audioContext.createBufferSource();
					_this.props.webaudio.source[_this.props.deckName].buffer = buffer;
					callback(file);
					//thisTrack.postLoadTasks();
		  		}, function(){alert("error loading!");} );

		  	};
			reader.readAsArrayBuffer(file);

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
		console.log('loadtrack ', this.props.state.decks[this.props.deckName].loadTrack);
	}

	render () {
		return (
			<div className="droppable">
				<h4>{this.state.trackName}</h4>
				<canvas ref="canvas" id={this.props.deckName} className={(this.props.state.decks[this.props.deckName].loadTrack)? 'Deck animateDeck':'Deck'} width="300px" height="238px"></canvas>
				<Transport {...this.props} deck={this.deck}/>
			</div>
		);
	}
}


Deck.propTypes = {
    deckName: React.PropTypes.string.isRequired
};

const mapStateToProps = function (state) {
  return {
	  state: state
  };
}

export default connect(mapStateToProps)(Deck);
