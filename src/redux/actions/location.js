import { SET_LOCATIONS } from './types'
import strapi from '../../api/strapi'

export const fetchLocations = () => async (dispatch, getState) => {
  const res = await strapi.get('/locations')
  dispatch({
    type: SET_LOCATIONS,
    payload: res.data,
  })
}
