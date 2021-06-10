const initialState = {
  categories: [
    {
      id: 1,
      denominazione: 'parco',
    },
    {
      id: 2,
      denominazione: 'farmacia',
    },
  ],
}

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state
  }
}

export default categoryReducer
