import {SENSOR_DONE, SENSOR_ERROR, SENSOR_LOADING, SENSOR_PERSIST} from '../actionTypes';

const initialState = {
    sensorData: [],
    loading: false,
    done: false,
    error: false,
    token: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SENSOR_LOADING:
            return {...state, loading: true, error: false};
        case SENSOR_DONE:
            return { ...state, loading: false, done: true, error: false};
        case SENSOR_PERSIST:
            return { ...state, sensorData: action.payload.data, token: action.payload.token};
        case SENSOR_ERROR:
            return {...state, loading: false, error: action.payload.error};
        default:
            return state;

    }
};
