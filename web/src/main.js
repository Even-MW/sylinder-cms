import "core-js/stable"
import "regenerator-runtime/runtime"

import App from "./App.js"
// Components
import { Provider } from "react-redux"
import React from "react"
import ReactDOM from "react-dom"
import inlineSvg from "@ng-mw/reol/utils/inlineSvg"
import makeStore from "./data/store/makeStore"
import startupConnectors from "./data/connectors/startupConnectors"

// Provided config:
const chainId = "1400"
const environment = 1
const userToken = ""
const inlineIconSetUrl = ""
const apikey = ""//add api key here

const store = makeStore()

startupConnectors(store, { chainId, environment, userToken, apikey })

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app"),
)

inlineSvg(inlineIconSetUrl)