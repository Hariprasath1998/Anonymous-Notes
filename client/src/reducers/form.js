import { GET_FORM, FORM_ERROR, CLEAR_FORM } from "../actions/types";

const initialState = {
    form :[]
}

export default function(state = initialState, action){
    const { type, payload } = action;
    
    switch(type){
        case GET_FORM:
            return {
                ...state,
                form: payload,
                loading: false
            }
        case FORM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_FORM:
            return {
                ...state,
                form: null,
                loading: false
            }
        case FORM_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default:
            return state
    }
}