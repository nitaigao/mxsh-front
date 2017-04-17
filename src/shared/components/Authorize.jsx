import React              from 'react'
import { Link           } from 'react-router'
import { connect        } from 'react-redux'
import { provideHooks   } from 'redial'

import styles             from './Authorize.css'

import { authorize      } from  '../modules/authentication'

const hooks = {
  defer: ({ dispatch, params }) => dispatch(authorize(params))
}

const Authorize = () => (
  <div id='authorize'>
    <p className={styles.message}>Logging you in...</p>
  </div>
)

const AuthorizeWithHooks = provideHooks(hooks)(Authorize)
export default connect()(AuthorizeWithHooks)
