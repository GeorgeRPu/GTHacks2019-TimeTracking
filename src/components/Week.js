import React from 'react';
import PropTypes from 'prop-types';
import Day from 'components/day';

import dayjs from 'dayjs';
import { getActivity } from 'db/firebase';
import ActivityPie from './activity-pie';

class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [[], [], [], [], [], [], []]
        }
    }

    summarize(activity) {
        let summaryMap = new Map();
        let blank = dayjs.duration(24 * 7, "hours");
        for (const item of activity) {
            const name = item.name.toLowerCase();
            let prev = dayjs.duration(0);
            if (summaryMap.has(name)) {
                prev = summaryMap.get(name);
            }
            const start = dayjs.unix(item.start.seconds);
            const end = dayjs.unix(item.end.seconds);
            const duration = end.diff(start);
            blank = blank.subtract(duration);
            summaryMap.set(name, prev.add(duration));
        }
        let summary = [];
        for (const [name, duration] of summaryMap) {
            summary.push({"name": name, "value": parseFloat(duration.asHours().toFixed(2))});
        }
        summary.push({"name": "blank", "value": parseFloat(blank.asHours().toFixed(2))})
        return summary;
    }

    async componentDidMount() {
        const activities = [];
        for (const day of daysOfWeek(this.props.now)) {
            const querySnap = await getActivity(day);
            const activity = querySnap.docs.map(docSnap => docSnap.data());
            activities.push(activity);
        }
        this.setState({activities: activities});
    }

    render() {
        const days = daysOfWeek(this.props.now).map((day, index) => {
            return <Day key={day.format("ddd")} day={day} activity={this.state.activities[index]} />;
        });
        return (
            <div className="week">
                <div className="week-row">
                    {days}
                </div>
                <ActivityPie data={this.summarize(this.state.activities.flat())}/>
            </div>
        )

    }
}

function daysOfWeek(now) {
    const sunday = now.startOf("week");
    return [0, 1, 2, 3, 4, 5, 6].map(num => sunday.add(num, "days"));
}

Week.propTypes = {
    now: PropTypes.object
}

export default Week;
