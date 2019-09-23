import React from "react";
import * as sensorDataActions from '../../state/sensor/actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, InputNumber, Col, Button, Table} from 'antd';
import 'antd/dist/antd.css';

const columns = [
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'index'
    },
    {
        title: 'City',
        dataIndex: 'city',
        key: 'city'
    },
    {
        title: 'Slot',
        dataIndex: 'slot',
        key: 'slot'
    },
    {
        title: 'Velocity',
        dataIndex: 'velocity',
        key: 'velocity'
    }
];

class dataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lowerIndex: 1,
            upperIndex: 20
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.props.fetchAllData(this.state.lowerIndex, this.state.upperIndex);
    };

    render = () => {
        return (
            <Col>
                <Row type="flex" justify="center">
                    <Col>
                    <p style={{fontSize: "18px"}}>From</p>
                    </Col>
                    <Col>
                    <InputNumber value={this.state.lowerIndex} min={1} max={1000}
                                 onChange={value => this.setState({lowerIndex: value})}/>
                    </Col>
                    <Col>
                    <p style={{fontSize: "18px"}}>To</p>
                    </Col>
                    <Col>
                    <InputNumber value={this.state.upperIndex} min={1} max={1000}
                                 onChange={value => this.setState({upperIndex: value})}/>
                    </Col>
                    <Col>
                    <Button primary={true} onClick={this.handleSubmit}
                            loading={this.props.loading}>Load</Button>
                    </Col>
                </Row>


                <Table dataSource={this.props.sensorData} columns={columns} loading={this.props.loading}
                       rowKey={item => item.index}
                       
                       size="small" bordered={true}/>
            </Col>
        )
    }
}

dataContainer.propTypes = {
    fetchAllData: PropTypes.func
};

const mapDispatchToProps = {
    ...sensorDataActions
};

const mapStateToProps = (state) => {
    return {
        loading: state.sensor.loading,
        done: state.sensor.done,
        error: state.sensor.error,
        sensorData: state.sensor.sensorData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(dataContainer);