const initialState = {
    thefts: [],
    theftsLoadingStatus: "idle",
};

const theftsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHING_THEFTS":
            return {
                ...state,
                theftsLoadingStatus: "loading"
            }
        case "FETCHED_THEFTS":
            return {
                ...state,
                theftsLoadingStatus: "idle",
                thefts: action.payload
            }
        case "FETCHED_THEFTS_ERROR":
            return {
                ...state,
                theftsLoadingStatus: "error",
            }
        
        case "ADD_THEFT":
            return{
                ...state,
                thefts: [...state.thefts, action.payload]
            }
        case "THEFT_DELETE":
            return {
                ...state,
                thefts: state.thefts.filter(item => item._id !== action.payload)
            }
        
        case "UPDATE_THEFT":
            const indexTheft = state.thefts.findIndex(({_id}) => action.payload._id === _id);
            const newThefts = [...state.thefts];
            newThefts[indexTheft] = action.payload;
            return {
                ...state,
                thefts: newThefts
            }
        default:
            return state;
    }
}

export default theftsReducer;