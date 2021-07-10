import {
  FETCH_DISTRICTS_SUCCESS,
  FETCH_DISTRICTS_PENDING,
  FETCH_DISTRICTS_FAILED,
} from './types'
import strapi from '../../api/strapi'

export const fetchDistricts = () => async dispatch => {
  dispatch({
    type: FETCH_DISTRICTS_PENDING,
  })
  try {
    const res = await strapi.get('/districts')
    dispatch({
      type: FETCH_DISTRICTS_SUCCESS,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: FETCH_DISTRICTS_FAILED,
      payload: error,
    })
  }
}
