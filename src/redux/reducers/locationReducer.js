import { SET_LOCATIONS } from '../actions/types'

const initialState = {
  locations: [],
}

const locationReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOCATIONS:
      return { ...state, locations: [...payload] }

    default:
      return state
  }
}

export default locationReducer
