import React from 'react'
import './HomeView.scss'
import Turntable from '../../../components/Deck'
import WebAudio from '../../../webAudio';

const webAudio = new WebAudio();
const decks = [{
					name: 'deckA'
				},
				{
					name: 'deckB'
				}];

//loadtrack should return something
let trackA = webAudio.loadTrack('static/sound1.wav', decks[0].name);

let trackB = webAudio.loadTrack('static/Noisia-mantra.mp3', decks[1].name);


export const HomeView = () => (
	<div className="container-fluid">
		<div className="row">
			<div className="col-md-6">
				<h4>Deck A</h4>
				<Turntable name="deckA" track={webAudio} />
			</div>
			<div className="col-md-6">
				<h4>Deck B</h4>
				<Turntable name="deckB" track={webAudio} />
			</div>
		</div>

	</div>
)

export default HomeView
