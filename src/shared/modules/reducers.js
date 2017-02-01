import { combineReducers }               from 'redux'

import { reducers as authentication }    from './authentication'
import { reducers as identities }        from './identities'

export default combineReducers({ authentication, identities })
