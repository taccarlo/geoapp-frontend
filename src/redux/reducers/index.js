import { combineReducers } from 'redux'
import mapReducer from './mapReducer'
import districtReducer from './districtReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
  map: mapReducer,
  district: districtReducer,
  category: categoryReducer,
})
