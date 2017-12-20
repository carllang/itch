import * as types from '../actions/actionTypes';
import initialState from '../initialState';

const update = require('react-addons-update');
// ------------------------------------
// Reducer
// ------------------------------------

export default function decksReducer (state = initialState, action) {
	switch (action.type) {
		case types.PLAY_CHANGE: {
			return (action.payload.deckName === 'deckA')?
			update(state, {deckA : {isPlaying: {$set: action.payload.isPlaying}}})
			:
			update(state, {deckB : {isPlaying: {$set: action.payload.isPlaying}}})
		}

		case types.BPM: {
			return (action.payload.deckName === 'deckA')?
			update(state, {deckA : {bpm: {$set: action.payload.bpm}}})
			:
			update(state, {deckB : {bpm: {$set: action.payload.bpm}}})
		}

		case types.LOAD_TRACK: {
			return (action.payload.deckName == 'deckA')?
			update(state, {deckA: {loadTrack: {$set: action.payload.trackName}}})
			:
			update(state, {deckB: {loadTrack: {$set: action.payload.trackName}}});
		}

		default: {
			return state;
		}

	}
}
