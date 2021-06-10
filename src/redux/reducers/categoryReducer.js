import { SET_CATEGORIES } from '../actions/types'

const initialState = {
  categories: [],
}

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: [...payload],
      }

    default:
      return state
  }
}

export default categoryReducer
