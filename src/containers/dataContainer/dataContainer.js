import React from "react";
import * as sensorDataActions from '../../state/sensor/actions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'

class dataContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lowerIndex: 1,
            upperIndex: 20,
            validated: false,
            lowerIndexInvalid: false,
            upperIndexInvalid: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.fetchAllData(this.state.lowerIndex, this.state.upperIndex);
    };

    isIndexWithinBounds = (index) => {
        return (index >= 1 && index <= 1000);
    };

    validate = () => {
        const indexOutOfBounds = 'Field value must be between 1 and 1000';
        let lowerIndexInvalid = this.isIndexWithinBounds(this.state.lowerIndex) ? false : indexOutOfBounds;
        let upperIndexInvalid = this.isIndexWithinBounds(this.state.upperIndex) ? false : indexOutOfBounds;
        if (!lowerIndexInvalid && this.state.lowerIndex > this.state.upperIndex) {
            lowerIndexInvalid = 'First index must be lower than second';
        }
        this.setState({
            lowerIndexInvalid: lowerIndexInvalid,
            upperIndexInvalid: upperIndexInvalid,
            valid: (!!lowerIndexInvalid || !!upperIndexInvalid)
        })
    };

    render = () => {
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <Form.Row>
                    <Col mr={1}>
                        <Form.Group>
                            <Form.Label>From</Form.Label>
                            <Form.Control type="number" value={this.state.lowerIndex}
                                          required
                                          isInvalid={!!this.state.lowerIndexInvalid}
                                          onChange={event => this.setState({lowerIndex: parseInt(event.target.value)}, () => this.validate())
                                          }/>
                            <Form.Control.Feedback type="invalid">{this.state.lowerIndexInvalid}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col ml={1}>
                        <Form.Group>
                            <Form.Label>To</Form.Label>
                            <Form.Control type="number"
                                          value={this.state.upperIndex}
                                          required
                                          isInvalid={!!this.state.upperIndexInvalid}
                                          onChange={event => this.setState({upperIndex: parseInt(event.target.value)}, () => this.validate())
                                          }/>
                            <Form.Control.Feedback type="invalid">{this.state.upperIndexInvalid}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Button variant="primary" size="lg" type="submit" disabled={!!this.state.valid}>Load</Button>
            </Form>
        )
    }
}

dataContainer.propTypes = {
    fetchAllData: PropTypes.func
};

const mapDispatchToProps = {
    ...sensorDataActions
};

export default connect(null, mapDispatchToProps)(dataContainer);