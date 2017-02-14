import { saga as authentication }    from './authentication'
import { saga as identities }        from './identities'

export default function* rootSaga() {
  yield [
    authentication(),
    identities()
  ]
}
