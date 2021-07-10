import { FETCH_LOCATIONS, CLEAR_LOCATIONS } from './types'
import strapi from '../../api/strapi'

export const fetchLocations =
  (categoryIds = []) =>
  async (dispatch, getState) => {
    let url = '/locations?'

    for (const id of categoryIds) {
      if (id) {
        url += `category_in=${id}&`
      }
    }

    const res = await strapi.get(url)
    dispatch({
      type: FETCH_LOCATIONS,
      payload: res.data,
    })
  }

export const clearLocations = () => ({
  type: CLEAR_LOCATIONS,
})
