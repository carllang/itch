import React from 'react'
import { connect } from 'react-redux'
import Deck from '../components/Deck/'

const DeckContainer = (props) => <Deck {...props} />

const mapStateToProps = (state) => ({ state })

export default connect(mapStateToProps)(DeckContainer)
