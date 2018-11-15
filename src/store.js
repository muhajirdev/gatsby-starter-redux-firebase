import { createStore, combineReducers, compose } from 'redux'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'

const rrfConfig = {
  userProfile: 'users',
}

export const createStoreWithFirebase = firebase => {
  const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig)
  )(createStore)

  const rootReducer = combineReducers({
    firebase: firebaseReducer,
  })

  const initialState = {}
  const store = createStoreWithFirebase(rootReducer, initialState)

  return store
}
