import {SENSOR_DONE, SENSOR_ERROR, SENSOR_LOADING, SENSOR_PERSIST} from '../actionTypes';
import {getDataRoute} from "../../globals/constants/apiRoutes"
import axios from "../../globals/axios";
import _ from 'lodash';

export const fetchAllData = (startIndex, endIndex) => {
    return (dispatch, getState) => {
        dispatch(startDataFetching());
        const token = getState().sensor.token;
        let config = {
            params: {
                from: startIndex,
                to: endIndex,
                token
            }
        };

        axios.getInstance().get(getDataRoute, config, {"Content-Type": "application/x-www-form-urlencoded"}).then(response => {
            console.log("response.data", response.data);
                let transformedData = transferData(response.data, startIndex, endIndex);
                dispatch(persistSensorData(transformedData, response.data.token));
                dispatch(onDataFetchingDone())
            }
        ).catch(error =>
            dispatch(onSensorDataError(error)))
    }
};

const transferData = (array, startIndex, endIndex) => {
    let unNulledArray = _.map(array.data, (el) => {
        return {
            index: el.index,
            city: el.city ? el.city : "None",
            slot: el.slot ? el.slot : 0,
            velocity: el.velocity ? el.velocity : 0.00
        }
    });
    let filledArray = _.reduce(unNulledArray, (acc, el) => {
        fillTheBlanks(acc, _.last(acc).index, el.index);
        acc.push(el);
        return acc;
    }, [{index: startIndex - 1}]);
    fillTheBlanks(filledArray, _.last(filledArray).index, endIndex + 1);
    filledArray.shift();
    return filledArray;
};

const fillTheBlanks = (array, firstIndex, lastIndex) => {
    if (firstIndex < lastIndex - 1) {
        for (let i = 1; i < (lastIndex - firstIndex); i++) {
            array.push({index: firstIndex + i, city: "None", slot: 0, velocity: 0.00})
        }
    }
};

const startDataFetching = () => {
    return {
        type: SENSOR_LOADING
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
};

const persistSensorData = (data, token) => {
    return {
        type: SENSOR_PERSIST,
        payload: {
            data: data,
            token: token
        }
    }
};