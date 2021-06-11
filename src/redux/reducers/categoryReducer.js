import { SHOW_CATEGORIES } from '../actions/types'

const initialState = {
  categories: [],
  show: false,
}

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_CATEGORIES:
      return {
        ...state,
        categories: [...payload.data],
        show: payload.show,
      }

    default:
      return state
  }
}

export default categoryReducer
