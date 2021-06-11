import { SHOW_DISTRICTS } from '../actions/types'

const initialState = {
  districts: [],
  show: false,
}

const districtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DISTRICTS:
      return {
        ...state,
        districts: [...payload.data],
        show: payload.show,
      }

    default:
      return state
  }
}

export default districtReducer
