import { SHOW_CATEGORIES } from './types'
import strapi from '../../api/strapi'

export const fetchCategories = () => async (dispatch, getState) => {
  if (!getState().category.categories.length) {
    const res = await strapi.get('/categories')
    dispatch({
      type: SHOW_CATEGORIES,
      payload: { data: res.data, show: true },
    })
  } else {
    dispatch({
      type: SHOW_CATEGORIES,
      payload: {
        data: getState().category.categories,
        show: !getState().category.show,
      },
    })
  }
}
