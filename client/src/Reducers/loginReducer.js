import * as types from '../Actions/types';

const initialState = { }

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                ...action.payload.user,
            }

        case types.SET_USERNAME:
            return {
                ...state,
                bitmoji: action.payload.bitmoji,
                userID: action.payload.userID,
            }
        default: return state;
    }
}