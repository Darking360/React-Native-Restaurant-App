const initialState = {
  cuisineTypes: [],
  cuisineTypesError: null,
  loadingSearch: false,
  results: [],
  myfood: [],
  foodLoading: false,
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
    case 'RESET_RESULTS':
      return {
        ...state,
        results: [],
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
    case 'SET_MY_FOOD':
      return {
        ...state,
        myfood: payload,
      };
    case 'FOODLOADING_ON':
      return { ...state, foodLoading: true };
    case 'FOODLOADING_OFF':
      return { ...state, foodLoading: false };
    default:
      return state;
  }
};
