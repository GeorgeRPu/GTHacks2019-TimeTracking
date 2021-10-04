import React from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration)

class ActivityItem extends React.Component {
    render () {
        const start = this.props.start;
        const end = this.props.end;
        return (
            <div className="ActivityItem">
                <button className="delete-item" onClick={() => {}}>X</button>
                <table>
                    <tbody>
                        <tr>
                            <td className="label">Name:</td>
                            <td>{this.props.name}</td>
                        </tr>
                        <tr>
                            <td className="label">Start:</td>
                            <td>{start.format("hh:mm A")}</td>
                        </tr>
                        <tr>
                            <td className="label">End:</td>
                            <td>{end.format("hh:mm A")}</td>
                        </tr>
                        <tr>
                            <td className="label">Duration:</td>
                            <td>{dayjs.duration(end.diff(start)).format("HH:mm")}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

ActivityItem.propTypes = {
    name: PropTypes.string,
    start: PropTypes.object,
    end: PropTypes.object,
}

class ActivityItems extends React.Component {
    render() {
        const activity = this.props.activity;
        activity.sort((a, b) => (a.start > b.start) ? 1 : -1);
        const activityItems = activity.map(item => {
            return (
                <li key={dayjs.unix(item.start.seconds).format("HH:mm A")}>
                    <ActivityItem
                        name={item.name}
                        start={dayjs.unix(item.start.seconds)}
                        end={dayjs.unix(item.end.seconds)}
                    />
                </li>
            );
        });
        return (
            <div className="ActivityItems">
                <h3>Activity items</h3>
                <ul className="no-bullets">{activityItems}</ul>
            </div>
        );
    }
}

ActivityItems.propTypes = {
    name: PropTypes.string,
    activity: PropTypes.array,
}

export default ActivityItems;
