const initialState = {
  loginError: null,
  loginLoading: false,
  loginMessage: null,
  registerLoading: false,
  registerError: null,
  registerMessage: null,
  loadingUpdate: false,
  loadingRecover: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH_LOGIN_LOADING':
      return {
        ...state,
        loginLoading: true,
      };
    case 'AUTH_HYDRATE_TOKEN':
      return {
        ...state,
        loginLoading: false,
        loginError: null,
        loginMessage: payload,
      };
    case 'AUTH_LOGIN_SUCCESS':
      return {
        ...state,
        loginLoading: false,
        loginError: null,
        loginMessage: payload,
      };
    case 'AUTH_LOGIN_ERROR':
      return {
        ...state,
        loginLoading: false,
        loginError: payload,
        loginMessage: null,
      };
    case 'AUTH_REGISTER_LOADING':
      return {
        ...state,
        registerLoading: true,
      };
    case 'AUTH_REGISTER_SUCCESS':
      return {
        ...state,
        registerLoading: false,
        registerError: null,
        registerMessage: payload,
      };
    case 'AUTH_REGISTER_ERROR':
      return {
        ...state,
        registerError: payload,
        registerLoading: false,
        registerMessage: null,
      };
    case 'AUTH_LOGOUT_RESET':
      return initialState;
    case 'UPDATE_LOADING_ON':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_LOADING_OFF':
      return { ...state, loadingUpdate: false };
    case 'RECOVER_LOADING_ON':
      return { ...state, loadingRecover: true };
    case 'RECOVER_LOADING_OFF':
      return { ...state, loadingRecover: false };
    default:
      return state;
  }
};
