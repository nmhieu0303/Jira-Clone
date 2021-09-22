import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import reduxThunk from 'redux-thunk';
import DrawerReducer from './../HOC/DrawerModal/DrawerReducer'
import TodolistReducer from './reducers/TodolistReducer';
import LoadingReducer from './reducers/LoadingReducer';
import UserReducer from './reducers/Jira/UserReducer';
import ProjectReducer from './reducers/Jira/ProjectReducer';
import TaskReducer from './reducers/Jira/TaskReducer';
import PriorityReducer from './reducers/Jira/PriorityReducer';
import StatusReducer from './reducers/Jira/StatusReducer';

import { rootSaga } from "./saga/rootSaga";

const middlewareSaga = createSagaMiddleware()
const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(reduxThunk, middlewareSaga)
    // other store enhancers if any
);
const rootReducer = combineReducers({
    TodolistReducer,
    LoadingReducer,
    UserReducer,
    ProjectReducer,
    DrawerReducer,
    TaskReducer,
    PriorityReducer,
    StatusReducer,
})

const store = createStore(rootReducer, enhancer);

middlewareSaga.run(rootSaga);


export default store;