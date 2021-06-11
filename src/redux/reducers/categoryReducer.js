import { SHOW_CATEGORIES, SWITCH_IS_CHECKED } from '../actions/types'

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

    case SWITCH_IS_CHECKED:
      const categories = state.categories.map((category) => {
        if (category.id === payload) {
          return {
            ...category,
            isChecked: !category.isChecked,
          }
        }
        return category
      })

      return {
        ...state,
        categories: [...categories],
      }

    default:
      return state
  }
}

export default categoryReducer
