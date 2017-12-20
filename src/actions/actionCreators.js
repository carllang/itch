import * as types from '../actions/actionTypes';


// ------------------------------------
// Actions
// ------------------------------------

export function playChange (deckName, isPlaying) {
    return {
        type    : types.PLAY_CHANGE,
        payload : {
            deckName: deckName,
            isPlaying: isPlaying
        }
    }
}

export function syncTrack (deckName) {
    return {
        type    : types.SYNC,
        payload : deckName
    }
}

export function setBPM (deckName, bpm) {
    return {
        type    : types.BPM,
		payload : {
            deckName: deckName,
            bpm: bpm
        }
    }
}

export function loadTrackDispatch (loader) {
    return {
        type    : types.LOAD_TRACK,
        payload : loader
    }
}
