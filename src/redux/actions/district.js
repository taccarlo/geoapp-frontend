import { SET_DISTRICTS } from './types'
import strapi from '../../api/strapi'

export const fetchDistricts = () => async (dispatch, getState) => {
  const res = await strapi.get('/districts')
  console.log('res.data :>> ', res.data)
  dispatch({
    type: SET_DISTRICTS,
    payload: res.data,
  })
}
