import * as types from '../actions/actionTypes';
import initialState from '../initialState';

const update = require('react-addons-update');
// ------------------------------------
// Reducer
// ------------------------------------

export default function decksReducer (state = initialState, action) {
	switch (action.type) {
		case types.PLAY_CHANGE_A: {
			return update(state, {deck: {deckA: {isPlaying: {$set: action.payload}}}});
		}

		case types.PLAY_CHANGE_B: {
			return update(state, {deck: {deckA: {isPlaying: {$set: action.payload}}}});
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
