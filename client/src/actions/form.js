import axios from 'axios';
import { setAlert } from './alert';
import { GET_FORM, FORM_ERROR } from './types'

// Get current user's profile
const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get(`/api/forms`);
        dispatch({
            type: GET_FORM,
            payload: res.data
        });
    } catch (err) {
     dispatch({
         type: FORM_ERROR,
         payload: { msg: err.response.statusText, status: err.response.status }
     })   
    }
}
const addForm = ( question ) => async dispatch => {
    const config = {
        headers : {
            'Content-type' : 'application/json'
        }
    }
    const body = await JSON.stringify({ question });
    try {
        const addResponse = await axios.post(`/api/forms/`, body, config);
        dispatch(setAlert('Form Added successfully', 'success', 3000));
        const getRes = await axios.get(`/api/forms`);
        dispatch({
            type: GET_FORM,
            payload: getRes.data
        });
    } catch (err) {
        dispatch({
            type: FORM_ERROR,
            payload: { msg: err.msg }
        })   
    }
}
    


const deleteForm = (id) => async dispatch => {
    const config = {
        headers : {
            'Content-type' : 'application/json'
        }}
    try {
        const delResponse = await axios.delete(`/api/forms/${id}`, config);
        
        dispatch(setAlert('Form deleted successfully', 'danger', 3000));
        const getRes = await axios.get(`/api/forms`);
        dispatch({
            type: GET_FORM,
            payload: getRes.data
        });
    } catch (err) {
     dispatch({
         type: FORM_ERROR,
         payload: { msg: err.msg }
     })   
    }
}

// Public
const getFormById = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/submitresponse/${id}`);
        dispatch({
            type: GET_FORM,
            payload: res.data
        });
    } catch (err) {
     dispatch({
         type: FORM_ERROR,
         payload: { msg: err.response.statusText }
     })   
    }
}

const submitResponse = (id, text) => async dispatch => {
    console.log('from submit')
    const config = {
        headers : {
            'Content-type' : 'application/json'
        }}
        const body = JSON.stringify({ text })
    try {
        const res = await axios.post(`/api/submitresponse/${id}`, body, config);
        
        dispatch(setAlert('Response recorded successfully', 'success', 3000));
    } catch (err) {
     dispatch(setAlert('Response submission failed', 'danger', 3000));   
    }
}




export { getCurrentProfile, deleteForm, addForm, getFormById, submitResponse }