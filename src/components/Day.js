import React from 'react';
import PropTypes from 'prop-types';
import ActivityForm from 'components/ActivityForm';
import ActivityItems from 'components/ActivityItems';
import ActivityPie from 'components/ActivityPie';

import dayjs from 'dayjs';
import * as utils from 'utils';

class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: [],
            summary: [],
        };
    }

    summarize(activity) {
        let summaryMap = new Map();
        let blank = dayjs.duration(24, "hours");
        for (const item of activity) {
            let prev = dayjs.duration(0);
            if (summaryMap.has(item.name)) {
                prev = summaryMap.get(item.name);
            }
            const duration = utils.durationBetween(dayjs(item.start), dayjs(item.end));
            blank = blank.subtract(duration);
            summaryMap.set(item.name, prev.add(duration));
        }
        let summary = [];
        for (const [name, duration] of summaryMap) {
            const asHours = parseFloat(duration.asHours().toFixed(2));
            summary.push({"name": name, "value": asHours});
        }
        const blankAsHours = parseFloat(blank.asHours().toFixed(2));
        summary.push({"name": "blank", "value": blankAsHours})
        return summary;
    }

    componentDidMount() {
        // this.setState({activity: getActivitiesForDay(this.props.dayjs)})
    }

    render() {
        return (
            <div className={dayjs().isSame(this.props.day, "day") ? "Day" : "Day-inactive"}>
                <h2>{this.props.day.format("YYYY-MM-DD")} ({utils.dayOfWeek(this.props.day)})</h2>
                <ActivityItems activity={this.state.activity} />
                <ActivityForm day={this.props.day} />
                <ActivityPie data={this.state.summary} />
            </div>
        )
    }
}

Day.propTypes = {
    day: PropTypes.object,
    activity: PropTypes.array,
    summary: PropTypes.array
}

export default Day;
