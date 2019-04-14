import * as types from './types';
import API from '../API';
import { addUser } from '../API/User';

export const newUser = (user) => async dispatch => {
    try {
        await addUser(user);

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