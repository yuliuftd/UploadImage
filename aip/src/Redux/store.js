import {createStore, combineReducers,applyMiddleware} from 'redux';
import {favours,awards} from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


const reducers={favours,awards};
const rootReducer = combineReducers(reducers);

export const configureStore = ()=> createStore(rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);
