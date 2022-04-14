export const getAllAspectReviewsReducer = (state = { aspectreview: [] }, action) => {
  switch (action.type) {
    case "GET_ALLASPECTREVIEW_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALLASPECTREVIEW_SUCCESS":
      return {
        ...state,
        loading: false,
        aspectreview: action.payload,
      };
    case "GET_ALLASPECTREVIEW_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};
