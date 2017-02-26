import React from 'react'
import './StageView.scss'
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


export const StageView = () => (
	<div className="container-fluid">
		<div className="row">
			<div className="col-md-4">
				<Deck deckName={decks[0].name} webaudio={webAudio} />
			</div>
			<div className="col-md-4">
				<h1> x__i t c h__x </h1>
				<Mixer decks={decks} webaudio={webAudio} />
			</div>
			<div className="col-md-4">
				<Deck deckName={decks[1].name} webaudio={webAudio} />
			</div>
		</div>

	</div>
)

export default StageView
