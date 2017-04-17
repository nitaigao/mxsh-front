import React            from 'react'
import { render       } from 'react-dom'

import { AppContainer } from 'react-hot-loader'
import App              from '../shared/containers/App'

render(
  <App />,
  document.getElementById('react-view')
)

if (module.hot) {
  module.hot.accept('../shared/containers/App', () => {
    const NextApp = require('../shared/containers/App').default;
    render(
      <NextApp />,
      document.getElementById('react-view')
    )
  })
}
