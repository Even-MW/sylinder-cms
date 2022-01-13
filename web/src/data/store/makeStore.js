import "core-js/stable";
import "regenerator-runtime/runtime";

import { applyMiddleware, combineReducers, compose, createStore } from "redux"

import { createLogger } from "redux-logger"
import { reducer as formReducer } from "redux-form"
import reduxPromise from "redux-promise"
import { reducers as searchReducer } from "@ng-mw/shared-react-components/search"
import thunkMiddleware from "redux-thunk"
import { reducers as userReducer } from "@ng-mw/shared-react-components/user"

const allReducers = combineReducers({
    form: formReducer,
    ...userReducer,
    ...searchReducer,
})

const makeStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        allReducers,
        composeEnhancers(
            applyMiddleware(
                thunkMiddleware,
                reduxPromise,
                createLogger({ collapsed: true }),
            ),
        ),
    )

    return store
}

export default makeStore