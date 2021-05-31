import React from 'react';
import PropTypes from 'prop-types';

import dayjs, { Dayjs } from 'dayjs';
import * as utils from 'utils';

class ActivityItem extends React.Component {
    render () {
        return (
            <div className="ActivityItem">
                <table>
                    <tbody>
                        <tr>
                            <td className="label">Name:</td>
                            <td>{this.props.name}</td>
                        </tr>
                        <tr>
                            <td className="label">Start:</td>
                            <td>{utils.timeString(this.props.start)}</td>
                        </tr>
                        <tr>
                            <td className="label">End:</td>
                            <td>{utils.timeString(this.props.end)}</td>
                        </tr>
                        <tr>
                            <td className="label">Duration:</td>
                            <td>{utils.durationString(this.props.start, this.props.end)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
ActivityItem.propTypes = {
    name: PropTypes.string,
    start: Dayjs,
    end: Dayjs,
}

class ActivityItems extends React.Component {
    render() {
        const activityItems = this.props.activity.map(item => {
            return (
                <li key={utils.timeString(dayjs(item.start))}>
                    <ActivityItem
                        name={item.name}
                        start={dayjs(item.start)}
                        end={dayjs(item.end)}
                    />
                </li>
            );
        });
        return (
            <div className="ActivityItems">
                <ul>{activityItems}</ul>
            </div>
        );
    }
}

ActivityItems.propTypes = {
    name: PropTypes.string,
    activity: PropTypes.array,
}

export default ActivityItems;
