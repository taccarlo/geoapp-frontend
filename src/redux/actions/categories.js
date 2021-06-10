import { SET_CATEGORIES } from './types'
import strapi from '../../api/strapi'

export const fetchCategories = () => async (dispatch, getState) => {
  const res = await strapi.get('/categories')
  dispatch({
    type: SET_CATEGORIES,
    payload: res.data,
  })
}
