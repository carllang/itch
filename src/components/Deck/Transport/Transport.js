import React from 'react';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import './transport.scss';

class Transport extends React.Component {

	constructor (props) {
		super (props) ;
	}

	render () {
		return (
			<div className="row">
				<div className="col-md-12">
					<PlayButton {...this.props}/>

					{/*
					<StopButton {...this.props} />
					<RewindButton />
					<ForwardButton />
					<SeekForward />
					<SeekBackward />
					<Cue />*/}
				</div>
			</div>
		);
	}
}

export default Transport;
