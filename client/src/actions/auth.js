import axios from 'axios';
import { setAlert } from './alert';
import { Link, Redirect } from 'react-router-dom';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_FORM } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({ type: AUTH_ERROR })
    }
}

// Register a User
export const register = ({ userid, password }) => async dispatch => {
    const config = {
        headers : {
            'Content-type' : 'application/json'
        }
    }

    const body = JSON.stringify({ userid, password});

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;
        

        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        
        dispatch({ type: REGISTER_FAIL })

    }
}


// Login User
export const login = ( userid, password ) => async dispatch => {
    const config = {
        headers : {
            'Content-type' : 'application/json'
        }
    }

    const body = JSON.stringify({ userid, password});

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => {
                dispatch(setAlert(error.msg, 'danger'))
            });
        }
        dispatch({ type: LOGIN_FAIL })
    }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_FORM });
    dispatch({ type: LOGOUT});
}