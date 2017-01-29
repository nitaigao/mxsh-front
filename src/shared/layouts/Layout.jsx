import React  from 'react'

const Layout = props => (
  <div>
    { props.children }
  </div>
)

Layout.propTypes = {
  children: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default Layout
