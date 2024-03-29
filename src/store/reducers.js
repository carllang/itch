import { combineReducers } from 'redux'
import locationReducer from './location'
import decksReducer from './decksReducer'


export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
	decks: decksReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
