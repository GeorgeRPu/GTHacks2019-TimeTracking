import React from 'react';
import * as utils from './utils';

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

class ActivityItems extends React.Component {
    render() {
        const activityItems = this.props.activity.map(item => {
            return (
                <li key={utils.timeString(utils.ts2d(item.start))}>
                    <ActivityItem
                        name={item.name}
                        start={utils.ts2d(item.start)}
                        end={utils.ts2d(item.end)}
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

export default ActivityItems;
