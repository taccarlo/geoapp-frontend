import { FETCH_DISTRICTS } from './types'
import strapi from '../../api/strapi'

export const fetchDistricts = () => async (dispatch, getState) => {
  const res = await strapi.get('/districts')
  dispatch({
    type: FETCH_DISTRICTS,
    payload: res.data,
  })
}
