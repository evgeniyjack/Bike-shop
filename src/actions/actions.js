import { createAction } from "@reduxjs/toolkit"
import { _apiUrl } from "../App";

//offers
export const offersError = createAction("FETCHED_OFFERS_ERROR")
export const offersFetching = createAction("FETCHING_OFFERS");
export const offersFetched = createAction("FETCHED_OFFERS");
export const offerDelete = createAction("OFFER_DELETE");
export const updateOfficer = createAction("UPDATE_OFFICER");

export const offersFetch = (request, token) => (dispatch) => {
    dispatch(offersFetching())
    request(_apiUrl + 'api/officers/', 'GET', null, {'Authorization': `Bearer ${token}`,})
        .then(res => dispatch(offersFetched(res.officers)))
        .catch(error => {
            console.log(error)
            dispatch(offersError());
        })
}


//thefts
export const theftsError = createAction("FETCHED_THEFTS_ERROR")
export const theftsFetching = createAction("FETCHING_THEFTS");
export const theftsFetched = createAction("FETCHED_THEFTS");
export const theftDelete = createAction("THEFT_DELETE");
export const theftAdd = createAction("ADD_THEFT");
export const updateTheft = createAction("UPDATE_THEFT");

export const theftsFetch = (request, token) => (dispatch) => {
    dispatch(theftsFetching())
    request(_apiUrl + 'api/cases/', 'GET', null, {'Authorization': `Bearer ${token}`})
        .then(res => dispatch(theftsFetched(res.data)))
        .catch(error => {
            console.log(error)
            dispatch(theftsError());
        })
}


//login
export const loginFetching = createAction("FETCHING_LOGIN");
export const loginFetched = createAction("FETCHED_LOGIN");
export const loginError = createAction("FETCH_LOGIN_ERROR");
export const registerFetched = createAction("FETCHED_REGISTER");
 
export const loginFetch = (request, e, url, setPopup = false, clientId = null) => (dispatch) => {
    dispatch(loginFetching());

    e.preventDefault();

    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData.entries());

    request(_apiUrl + url, 'POST', JSON.stringify({...formDataObject, clientId}),
    {
        'Content-Type': 'application/json'
    })
        .then(res => {
            if (url.includes('sign_in')) {
                dispatch(loginFetched(res));
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('date-auth', new Date().getTime());
            }else{
                dispatch(registerFetched());
                alert('Вы успешно зарегестрировались!')
            }
            setPopup && setPopup(false)
        })
        .catch(error => {
            alert(error.message);
            dispatch(loginError());
        })
}

export const logOut = () => (dispatch) => {
    localStorage.setItem('user', '');
    dispatch({type: "LOG_OUT"})
};

//https://sf-final-project-be.herokuapp.com/api/auth/sign_in
//https://sf-final-project-be.herokuapp.com/api/auth/sign_up