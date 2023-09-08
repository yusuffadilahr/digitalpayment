const initialState = {
    servicesData: [],
    error: null,
  };
  
  const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_SERVICES_SUCCESS':
        return {
          ...state,
          servicesData: action.payload,
          error: null,
        };
      case 'FETCH_SERVICES_FAILURE':
        return {
          ...state,
          servicesData: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default serviceReducer;