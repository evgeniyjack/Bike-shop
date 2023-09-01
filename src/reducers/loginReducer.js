const initialState = {
    auth: false,
    approved: false,
    user: {},
    loginLoadingStatus: "idle"
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCHING_LOGIN":
            return {
                ...state,
                loginLoadingStatus: "loading"
            }
        case "FETCH_LOGIN_ERROR":
            return {
                ...state,
                loginLoadingStatus: "idle"
            }
        case "FETCHED_REGISTER":
            return {
                ...state,
                loginLoadingStatus: "idle"
            }

        case "FETCHED_LOGIN":
            return {
                ...state,
                auth: true,
                approved: action.payload.data.user.approved,
                user: action.payload.data,
                loginLoadingStatus: "idle"
            }

        case "LOG_OUT":
            return {
                ...state,
                user: {},
                auth: false,
                approved: false
            }
        default:
            return state;
    }
} 

export default userReducer;