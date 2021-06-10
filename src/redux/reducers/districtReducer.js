import { SET_DISTRICTS } from '../actions/types'

const initialState = {
  districts: [],
}

const districtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_DISTRICTS:
      return {
        ...state,
        districts: [...payload],
      }

    default:
      return state
  }
}

export default districtReducer
