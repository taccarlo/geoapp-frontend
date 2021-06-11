import { SHOW_DISTRICTS } from './types'
import strapi from '../../api/strapi'

export const fetchDistricts = () => async (dispatch, getState) => {
  if (!getState().district.districts.length) {
    const res = await strapi.get('/districts')
    dispatch({
      type: SHOW_DISTRICTS,
      payload: { data: res.data, show: true },
    })
  } else {
    dispatch({
      type: SHOW_DISTRICTS,
      payload: {
        data: getState().district.districts,
        show: !getState().district.show,
      },
    })
  }
}
