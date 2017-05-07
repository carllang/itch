import React, { Component, PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

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
          <Router children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
