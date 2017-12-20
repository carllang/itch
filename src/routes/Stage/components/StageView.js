import React from 'react'
import './StageView.scss'
import DeckContainer from '../../../containers/DeckContainer'
import Mixer from '../../../components/Mixer'
import WebAudio from '../../../webAudio'

const webAudio = new WebAudio()
const decks = [
  {
    name: 'deckA'
  },
  {
    name: 'deckB'
  }
]

export const StageView = () =>
  <div className='container-fluid'>
    <div className='row'>
      <div className='col-md-4'>
        <DeckContainer deckName={decks[0].name} webaudio={webAudio} />
      </div>
      <div className='col-md-4'>
        <h1> itch </h1>
        <Mixer decks={decks} webaudio={webAudio} />
      </div>
      <div className='col-md-4'>
        <DeckContainer deckName={decks[1].name} webaudio={webAudio} />
      </div>
    </div>
  </div>

export default StageView
