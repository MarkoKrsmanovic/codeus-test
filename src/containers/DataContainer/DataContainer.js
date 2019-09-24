import React from "react";
import * as sensorDataActions from "../../state/sensor/actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {sensorDataColumnConfig} from "../../globals/constants/data";
import {Row, InputNumber, Col, Button, Table, Alert} from "antd";
import "antd/dist/antd.css";
import style from "./DataContainerStyle";
import withStyles from "react-jss";

const BAN_TEXT = 'You have been banned for 30 seconds, please wait!';

class dataContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lowerIndex: 1,
			upperIndex: 20
		};
	}

	handleSubmit = event => {
		event.preventDefault();
		this.props.fetchAllData(this.state.lowerIndex, this.state.upperIndex);
	};

	render = () => {
		let {classes, sensorData, loading, error} = this.props;
		return (
			<Col className={classes.container}>
				<Row type="flex" justify="center" align="center">
					<p className={classes.text}>From</p>
					<Col className={classes.inputContainer}>
						<InputNumber
							value={this.state.lowerIndex}
							min={1}
							max={1000}
							onChange={value =>
								this.setState({lowerIndex: value})
							}
						/>
					</Col>
					<p className={classes.text}>To</p>
					<Col className={classes.inputContainer}>
						<InputNumber
							value={this.state.upperIndex}
							min={1}
							max={1000}
							onChange={value =>
								this.setState({upperIndex: value})
							}
						/>
					</Col>
					<Button
						onClick={this.handleSubmit}
						loading={loading}
					>
						Load
					</Button>
				</Row>

				{this.props.error ? (
					<Col className={classes.warningContainer}>
						<Alert
							message={"Error " + error.status}
							description={error.status === 400 ? BAN_TEXT : error.statusText}
							type="error"
							showIcon
						/>
					</Col>
				) : null}

				<Table
					dataSource={sensorData}
					columns={sensorDataColumnConfig}
					loading={loading}
					rowKey={item => item.index}
					size="small"
					pagination={{pageSize: 20, showQuickJumper: true}}
					bordered={true}
				/>
			</Col>
		);
	};
}

dataContainer.propTypes = {
	fetchAllData: PropTypes.func,
	classes: PropTypes.object,
	loading: PropTypes.bool,
	sensorData: PropTypes.array,
	error: PropTypes.oneOf([
		PropTypes.bool,
		PropTypes.exact({
			status: PropTypes.number,
			statusText: PropTypes.string
		})
	])
};

const mapDispatchToProps = {
	...sensorDataActions
};

const mapStateToProps = state => {
	return {
		loading: state.sensor.loading,
		error: state.sensor.error,
		sensorData: state.sensor.sensorData
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(style)(dataContainer));
