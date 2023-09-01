const initialState = {
    offers: [],
    offersLoadingStatus: "idle",
};

const offersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHING_OFFERS":
            return {
                ...state,
                offersLoadingStatus: "loading"
            }
        case "FETCHED_OFFERS":
            return {
                ...state,
                offersLoadingStatus: "idle",
                offers: action.payload
            }
        case "FETCHED_OFFERS_ERROR":
            return {
                ...state,
                offersLoadingStatus: "error",
            }

        case "OFFER_DELETE":
            return {
                ...state,
                offers: state.offers.filter(item => item._id !== action.payload)
            }
        case "UPDATE_OFFICER":
            const indexOffer = state.offers.findIndex(({_id}) => action.payload._id === _id);
            const newOffers = [...state.offers];
            newOffers[indexOffer] = action.payload;
            return {
                ...state,
                offers: newOffers
            }
        default:
            return state;
    }
}

export default offersReducer;