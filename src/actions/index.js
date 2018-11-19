export const authLogin = (email, password) => ({
  type: 'AUTH_LOGIN',
  payload: {
    email,
    password,
  },
});

export const authRegister = (email, password, address, name, description, role) => ({
  type: 'AUTH_REGISTER',
  payload: {
    email,
    password,
    address,
    name,
    description,
    role,
  },
});
export const authLogout = () => ({
  type: 'AUTH_LOGOUT',
});

export const fetchCuisineTypes = () => ({
  type: 'FETCH_CUISINE_TYPES',
});

export const fetchRestaurant = (id = null) => ({
  type: 'FETCH_RESTAURANT',
  payload: {
    id,
  },
});

export const fetchRestaurantByType = (type = null, isFromCuisine = false) => ({
  type: 'FETCH_RESTAURANT_TYPE',
  payload: {
    type,
    isFromCuisine,
  },
});

export const fetchOrders = () => ({
  type: 'FETCH_ORDERS',
});

export const doCancelOrder = () => ({
  type: 'CANCEL_ORDER',
});

export const createOrder = (items, total) => ({
  type: 'CREATE_ORDER',
  payload: {
    items,
    total,
  },
});

export const updateUser = (payload) => ({
  type: 'UPDATE_USER',
  payload,
});

export const recoverPassword = (payload) => ({
  type: 'RECOVER_PASSWORD',
  payload,
});

export const doSearch = (payload) => ({
  type: 'DO_SEARCH',
  payload,
});

export const resetResults = (payload) => ({
  type: 'RESET_RESULTS',
});
