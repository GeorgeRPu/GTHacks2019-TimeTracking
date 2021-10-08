import React from 'react';
import PropTypes from 'prop-types';
import ActivityForm from 'components/activity-form';
import ActivityItems from 'components/activity-items';
import ActivityPie from 'components/activity-pie';

import dayjs from 'dayjs';

class Day extends React.Component {

    summarize(activity) {
        let summaryMap = new Map();
        let blank = dayjs.duration(24, "hours");
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

    render() {
        const summary = this.summarize(this.props.activity);
        return (
            <div className={dayjs().isSame(this.props.day, "day") ? "day" : "day-inactive"}>
                <h2>{this.props.day.format("YYYY-MM-DD")} ({this.props.day.format("ddd")})</h2>
                <ActivityItems activity={this.props.activity} />
                <ActivityForm day={this.props.day} />
                <ActivityPie data={summary} size={300} />
            </div>
        )
    }
}

Day.propTypes = {
    day: PropTypes.object,
    activity: PropTypes.array
}

export default Day;
