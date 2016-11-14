import React from 'react'
import './HomeView.scss'
import Turntable from '../../../components/Deck'
import Mixer from '../../../components/Mixer';
import WebAudio from '../../../webAudio';

const webAudio = new WebAudio();
const decks = [{
					name: 'deckA'
				},
				{
					name: 'deckB'
				}];


export const HomeView = () => (
	<div className="container-fluid">
		<div className="row">
			<div className="col-md-4">
				<h4>Deck A</h4>
				<Turntable deckName={decks[0].name} webaudio={webAudio} />
			</div>
			<div className="col-md-4">
				<h4>Mixer</h4>
				<Mixer decks={decks} webaudio={webAudio} />
			</div>
			<div className="col-md-4">
				<h4>Deck B</h4>
				<Turntable deckName={decks[1].name} webaudio={webAudio} />
			</div>
		</div>

	</div>
)

export default HomeView
