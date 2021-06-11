import { SET_LOCATIONS } from './types'
import strapi from '../../api/strapi'

export const fetchLocations = (categoryIds) => async (dispatch, getState) => {
  let url = '/locations?'
  if (!categoryIds.length) {
    return dispatch({
      type: SET_LOCATIONS,
      payload: [],
    })
  }

  for (const id of categoryIds) {
    url += `category_in=${id}&`
  }

  const res = await strapi.get(url)
  dispatch({
    type: SET_LOCATIONS,
    payload: res.data,
  })
}
