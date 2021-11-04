import React from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { deleteActivity } from 'db/firebase';
dayjs.extend(duration)

class ActivityItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        const start = this.props.start;
        deleteActivity(start, start.format("HH-mm-ss"));
    }

    render () {
        const { name, start, end } = this.props;
        return (
            <div className="bg-gray-200 border-2 rounded-lg m-2 shadow">
                <button className="hover:bg-red-700 hover:text-white m-1 py-0 px-1 rounded float-right " onClick={this.handleDelete}>✕</button>
                <div className="grid grid-cols-5">
                    <div className="col-span-2 font-bold ml-1">Name:</div>
                    <div className="col-span-3 font-bold">{name}</div>

                    <div className="col-span-2 font-bold ml-1">Start:</div>
                    <div className="col-span-3">{start.format("hh:mm A")}</div>

                    <div className="col-span-2 font-bold ml-1">End:</div>
                    <div className="col-span-3 ">{end.format("hh:mm A")}</div>

                    <div className="col-span-2 font-bold ml-1">Duration:</div>
                    <div className="col-span-3">{dayjs.duration(end.diff(start)).format("HH:mm")}</div>
                </div>
            </div>
        );
    }
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
            <div className="">
                <h3 className="text-lg ml-3 font-semibold">Activity items</h3>
                <ul>{activityItems}</ul>
            </div>
        );
    }
}

ActivityItem.propTypes = {
    name: PropTypes.string,
    start: PropTypes.object,
    end: PropTypes.object,
}

ActivityItems.propTypes = {
    activity: PropTypes.array,
}

export default ActivityItems;
