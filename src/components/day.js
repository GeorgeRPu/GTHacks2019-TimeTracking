import React from 'react';
import PropTypes from 'prop-types';
import ActivityForm from 'components/activity-form';
import ActivityItems from 'components/activity-items';
import { ActivityPie } from 'components/activity-charts';

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
        const { day, activity } = this.props;
        const summary = this.summarize(activity);
        summary.sort((a, b) => a.value < b.value ? 1 : -1);
        return (
            <div className={dayjs().isSame(day, "day") ? "border-2 border-black text-black" : "border text-gray-400 border-gray-400"}>
                <h2 className="text-xl text-center font-semibold">{day.format("YYYY-MM-DD")} ({day.format("ddd")})</h2>
                <ActivityItems activity={activity} />
                <ActivityForm day={day} />
                <ActivityPie data={summary} width={300} height={400} />
            </div>
        )
    }
}

Day.propTypes = {
    day: PropTypes.object,
    activity: PropTypes.array
}

export default Day;
