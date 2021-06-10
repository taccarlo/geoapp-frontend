import { combineReducers } from 'redux'
import districtReducer from './districtReducer'
import mapReducer from './mapReducer'

export default combineReducers({
  map: mapReducer,
  district: districtReducer,
})
