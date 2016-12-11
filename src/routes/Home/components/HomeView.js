import React from 'react'
import './HomeView.scss'
import Deck from '../../../components/Deck'
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
				<Deck deckName={decks[0].name} webaudio={webAudio} />
			</div>
			<div className="col-md-4">
				<h1> __i t c h__ </h1>
				<Mixer decks={decks} webaudio={webAudio} />
			</div>
			<div className="col-md-4">
				<Deck deckName={decks[1].name} webaudio={webAudio} />
			</div>
		</div>

	</div>
)

export default HomeView
