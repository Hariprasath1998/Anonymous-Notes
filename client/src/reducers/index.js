import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import form from './form';
export default combineReducers({
    alert,
    auth,
    form
})