import React, { Component } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import { PropTypes } from 'prop-types'
import createBrowserHistory from 'history/lib/createBrowserHistory'

const history = createBrowserHistory()

class AppContainer extends Component {
    static propTypes = {
      routes : PropTypes.object.isRequired,
      store  : PropTypes.object.isRequired
    }

  shouldComponentUpdate () {
      return false
  }

  componentDidMount () {
	//   function preventDefaultExcept(predicates) {
	//   return function (e) {
	//     var passEvery = predicates.every(function (predicate) { return predicate(e); })
	//     if (!passEvery) {
	//       e.preventDefault();
	//     }
	//   };
	// }
  }

  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
