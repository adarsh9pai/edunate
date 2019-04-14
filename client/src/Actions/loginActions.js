import * as types from './types';
import API from '../API';

export const newUser = (user) => async dispatch => {
    try {
        await API.post('/users/add', {
            ...user
        });

        dispatch({
            type: types.NEW_USER,
            payload: user
        })
    } catch (error) {
        console.log(error);
    }
}

export const setUserName = (userID, bitmoji) => async dispatch => {
    try {
        console.log('sending dispatch');
        dispatch({
            type: types.SET_USERNAME,
            payload: {
                userID,
                bitmoji
            }
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = user => async dispatch => {
    try {
        dispatch({
            type: types.LOGIN,
            payload: user
        });
    } catch (error) {
        console.log(error);
    }
}