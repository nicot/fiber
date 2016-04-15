import refresh from './refresh'
import { loadDataAsync } from './actions'
import { updateHistory } from './actions'

loadDataAsync()
updateHistory()
refresh()
