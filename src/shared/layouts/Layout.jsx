import React  from 'react'

const Layout = props => (
  <div>
    { props.children }
  </div>
)

Layout.propTypes = {
  children: React.PropTypes.shape().isRequired
}

export default Layout
