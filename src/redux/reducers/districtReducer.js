const initialState = {
  districts: [
    {
      id: 1,
      denominazione: 'San Massimo',
      lat: 45.43176,
      lng: 10.94477,
    },
    {
      id: 2,
      denominazione: 'La Spiana',
      lat: 45.42835,
      lng: 10.96523,
    },
  ],
}

const districtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}
export default districtReducer
