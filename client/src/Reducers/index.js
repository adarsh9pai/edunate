import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import * as types from '../Actions/types';

const appReducer = combineReducers({
    login: loginReducer,
});

export default (state, action) => {
    if (action.type === types.LOGOUT) {

        // Remove the state from local storage
        Object.keys(state).forEach(key => {
            localStorage.removeItem(key);
        });

        // Clear the redux state
        state = undefined
    }

    return appReducer(state, action);
}