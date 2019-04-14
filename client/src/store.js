import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const STORAGE_NAME = 'edunate'
const middleware = [thunk];

const store = createStore(
    rootReducer,
    loadStateFromStorage(),
    composeWithDevTools(
        applyMiddleware(...middleware),
    )
);

// Saves the state locally whenever the Redux state is updated
// Helps persist data across refresh
// Has performance problems if several saves occur in a short time frame
store.subscribe(() => {
    saveState(store.getState());
})

function loadStateFromStorage() {
    try {
        let serializedState = localStorage.getItem(STORAGE_NAME);

        if (serializedState === null) {
            return initialState;
        }

        return JSON.parse(serializedState);
    }
    catch (err) {
        return initialState;
    }
}

function saveState(state) {
    try {
        let serializedState = JSON.stringify(state);
        localStorage.setItem(STORAGE_NAME, serializedState);
    }
    catch (err) {
    }
}

export default store;
