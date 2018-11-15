import React, { Component } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import getFirebase from '../firebase'
import FirebaseContext from '../components/FirebaseContext'
import SignIn from '../containers/SignIn'
import { createStoreWithFirebase } from '../store'

class Layout extends Component {
  state = {
    firebase: null,
    authenticated: false,
    store: null,
  }

  componentDidMount() {
    const app = import('firebase/app')
    const auth = import('firebase/auth')
    const database = import('firebase/database')

    Promise.all([app, auth, database]).then(values => {
      const firebase = getFirebase(values[0])
      this.setState({ firebase })

      const store = createStoreWithFirebase(firebase)
      this.setState({ store })

      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          this.setState({ authenticated: false })
        } else {
          this.setState({ authenticated: true })
        }
      })
    })
  }

  render = () => {
    const { firebase, authenticated, store } = this.state

    if (!firebase || !store) return null

    return (
      <ReduxProvider store={store}>
        <FirebaseContext.Provider value={firebase}>
          {authenticated ? this.props.children : <SignIn />}
        </FirebaseContext.Provider>
      </ReduxProvider>
    )
  }
}

export default Layout
