import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import reducers from "./state/index";
import DataContainer from "./containers/dataContainer/dataContainer";

import './App.css';

function App() {

    const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));
    console.log("store:", store);
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <p>
                        hei
                    </p>
                    <DataContainer/>
                </header>
            </div>
        </Provider>
    );
}

export default App;
