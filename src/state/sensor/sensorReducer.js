import {SENSOR_DONE, SENSOR_ERROR, SENSOR_LOADING, SENSOR_PERSIST} from '../actionTypes';

const initialState = {
    sensorData: [],
    loading: false,
    done: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SENSOR_LOADING:
            return {...state, loading: action.payload.status};
        case SENSOR_DONE:
            return { ...state, loading: false, done: true};
        case SENSOR_PERSIST:
            return { ...state, sensorData: action.payload};
        case SENSOR_ERROR:
            return {...state, loading: false, error: action.payload};
        default:
            return state;

    }
};