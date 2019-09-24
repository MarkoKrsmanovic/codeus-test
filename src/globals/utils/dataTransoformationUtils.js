import _ from "lodash";

// sensor data utils
export const transformSensorData = (array, startIndex, endIndex) => {
	let unNulledArray = _.map(array.data, el => {
		return {
			index: el.index,
			city: el.city ? el.city : "None",
			slot: el.slot ? el.slot : 0,
			velocity: el.velocity ? el.velocity : 0.0
		};
	});
	let filledArray = _.reduce(
		unNulledArray,
		(acc, el) => {
			fillMissingIndexes(acc, _.last(acc).index, el.index);
			acc.push(el);
			return acc;
		},
		[{ index: startIndex - 1 }]
	);
	fillMissingIndexes(filledArray, _.last(filledArray).index, endIndex + 1);
	filledArray.shift();
	return filledArray;
};

const fillMissingIndexes = (array, firstIndex, lastIndex) => {
	if (firstIndex < lastIndex - 1) {
		for (let i = 1; i < lastIndex - firstIndex; i++) {
			array.push({
				index: firstIndex + i,
				city: "None",
				slot: 0,
				velocity: 0.0
			});
		}
	}
};

export const generateConfigForDataFetch = (
	token,
	error,
	startIndex,
	endIndex
) => {
	if (!token || (!!error && error.status === 500)) {
		return { params: { from: startIndex, to: endIndex } };
	} else {
		return { params: { from: startIndex, to: endIndex, token } };
	}
};
