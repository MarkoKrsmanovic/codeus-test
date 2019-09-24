import {
	SENSOR_DONE,
	SENSOR_ERROR,
	SENSOR_LOADING,
	SENSOR_PERSIST
} from "../actionTypes";
import { getDataRoute } from "../../globals/constants/apiRoutes";
import axios from "../../globals/axios";
import {
	transformSensorData,
	generateConfigForDataFetch
} from "../../globals/utils/dataTransoformationUtils";

export const fetchAllData = (startIndex, endIndex) => {
	return (dispatch, getState) => {
		dispatch(startDataFetching());
		const sensor = getState().sensor;
		let config = generateConfigForDataFetch(
			sensor.token,
			sensor.error,
			startIndex,
			endIndex
		);
		console.log("config", config);
		axios
			.getInstance()
			.get(getDataRoute, config, {
				"Content-Type": "application/x-www-form-urlencoded"
			})
			.then(response => {
				let transformedData = transformSensorData(
					response.data,
					startIndex,
					endIndex
				);
				dispatch(
					persistSensorData(transformedData, response.data.token)
				);
				dispatch(onDataFetchingDone());
			})
			.catch(error => {
				if (error.response) {
					dispatch(
						onSensorDataError({
							status: error.response.status,
							statusText: error.response.statusText
						})
					);
				} else {
					dispatch(
						onSensorDataError({
							status: 404,
							statusText: "Something went wrong, please try again"
						})
					);
				}
			});
	};
};

const startDataFetching = () => {
	return {
		type: SENSOR_LOADING
	};
};

const onDataFetchingDone = () => {
	return {
		type: SENSOR_DONE
	};
};

const onSensorDataError = error => {
	return {
		type: SENSOR_ERROR,
		payload: {
			error: error
		}
	};
};

const persistSensorData = (data, token) => {
	return {
		type: SENSOR_PERSIST,
		payload: {
			data: data,
			token: token
		}
	};
};
