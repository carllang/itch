import * as types from '../actions/actionTypes';

// ------------------------------------
// Actions
// ------------------------------------
export function playChange (isplaying) {
  return {
    type    : types.PLAY_CHANGE,
    payload : isplaying
  }
}


export function loadTrackDispatch (loader) {
  return {
    type    : types.LOAD_TRACK,
    payload : loader
  }
}
