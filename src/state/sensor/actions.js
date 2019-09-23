import {SENSOR_DONE, SENSOR_ERROR, SENSOR_LOADING, SENSOR_PERSIST} from '../actionTypes';
import { getDataRoute } from "../../globals/constants/apiRoutes"
import axios from "../../globals/axios";

export const fetchAllData = (startIndex, endIndex) => {
    return (dispatch, getState) => {
        dispatch(startDataFetching());
        let config = {
            params: {
                from: startIndex,
                to: endIndex
            }
        };
        axios.getInstance().get(getDataRoute, config, {"Content-Type": "application/x-www-form-urlencoded"}).then(response =>
        {dispatch(persistSensorData(response.data))
        dispatch(onDataFetchingDone())}
        ).catch(error =>
        dispatch(onSensorDataError(error.error)))
    }
}

const fetchDataRow = () => {
    return (dispatch, getState) => {

    }
}

const startDataFetching = () => {
    return {
        type: SENSOR_LOADING,
        payload: {
            status: 'Fetching data items...'
        }
    }
};

const onDataFetchingDone = () => {
    return {
        type: SENSOR_DONE
    }
};

const onSensorDataError = (error) => {
    return {
        type: SENSOR_ERROR,
        payload: {
            error: error
        }
    }
}

const persistSensorData = (data) => {
    return {
        type: SENSOR_PERSIST,
        payload: data
    }
}