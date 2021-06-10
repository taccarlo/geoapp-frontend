import { SET_VIEW } from '../actions/types'

const initialState = {
  center: [45.438351, 10.99171],
  zoom: 14,
}

const mapReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_VIEW:
      console.log('payload :>> ', payload)
      return { ...state, center: [payload.lat, payload.lng] }

    default:
      return state
  }
}

export default mapReducer
