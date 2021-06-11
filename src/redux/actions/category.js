import { SHOW_CATEGORIES, SWITCH_IS_CHECKED } from './types'
import strapi from '../../api/strapi'

export const fetchCategories = () => async (dispatch, getState) => {
  if (!getState().category.categories.length) {
    const res = await strapi.get('/categories')
    for (const category of res.data) {
      category.isChecked = false
    }
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

export const switchIsChecked = (payload) => ({
  type: SWITCH_IS_CHECKED,
  payload,
})
