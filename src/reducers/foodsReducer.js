const initialState = {
  cuisineTypes: [],
  cuisineTypesError: null,
  loadingSearch: false,
  results: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'FETCH_CUISINE_TYPE_SUCCESS':
      return {
        ...state,
        cuisineTypes: payload,
        cuisineTypesError: null,
      };
    case 'FETCH_CUISINE_TYPE_ERROR':
      return {
        ...state,
        cuisineTypesError: payload,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        results: payload,
      };
    case 'SEARCHING_ON':
      return {
        ...state,
        loadingSearch: true,
      };
    case 'SEARCHING_OFF':
      return {
        ...state,
        loadingSearch: false,
      };
    default:
      return state;
  }
};
