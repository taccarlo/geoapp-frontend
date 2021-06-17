import _ from 'lodash'
import { FETCH_DISTRICTS } from '../actions/types'

const initialState = {}

const districtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_DISTRICTS:
      return { ...state, ..._.mapKeys(payload, 'id') }

    default:
      return state
  }
}

export default districtReducer
