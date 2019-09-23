import { combineReducers } from "redux";
import sensorReducer from "./sensor/sensorReducer";

export default combineReducers({
    sensor: sensorReducer
});

