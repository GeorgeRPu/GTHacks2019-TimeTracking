import React from 'react';
import PropTypes from 'prop-types';

import { addActivityDoc } from 'db/firebase';

class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            start: "",
            end: ""
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStartChange = this.handleStartChange.bind(this);
        this.handleEndChange = this.handleEndChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({name: event.target.value.toLowerCase()});
    }

    handleStartChange(event) {
        this.setState({start: event.target.value});
    }

    handleEndChange(event) {
        this.setState({end: event.target.value});
    }

    handleSubmit(event) {
        addActivityDoc(this.props.day, this.state.name, this.state.start, this.state.end);
        this.setState({
            name: "",
            start: "",
            end: ""
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="activity-form">
                <form onSubmit={this.handleSubmit}>
                    <h3>Add new item</h3>
                    <table className="form-text">
                        <tbody>
                            <tr>
                                <td className="label">Name:</td>
                                <td><input type="text" value={this.state.name} onChange={this.handleNameChange} /></td>
                            </tr>
                            <tr>
                                <td className="label">Start:</td>
                                <td><input type="text" value={this.state.start} onChange={this.handleStartChange} /></td>
                            </tr>
                            <tr>
                                <td className="label">End:</td>
                                <td><input type="text" value={this.state.end} onChange={this.handleEndChange} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

ActivityForm.propTypes = {
    day: PropTypes.object
}

export default ActivityForm;
