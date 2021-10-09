import React from 'react';
import PropTypes from 'prop-types';
import Day from 'components/day';

import dayjs from 'dayjs';
import { listenForActivity } from 'db/firebase';
import { ActivityPie, ActivityBar } from './activity-charts';

class Week extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: [[], [], [], [], [], [], []]
        }
        this.exportAsCSV = this.exportAsCSV.bind(this);
    }

    daysOfWeek() {
        const sunday = this.props.now.startOf("week");
        return [0, 1, 2, 3, 4, 5, 6].map(num => sunday.add(num, "days"));
    }

    processRow(row) {
        let finalVal = "";
        for (let j = 0; j < row.length; j++) {
            let innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            }
            let result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0) {
                result = '"' + result + '"';
            }
            if (j > 0) {
                finalVal += ',';
            }
            finalVal += result;
        }
        return finalVal + '\n';
    }

    exportAsCSV() {
        let csvFile = "";
        const days = this.daysOfWeek();
        for (let i = 0; i < 7; i++) {
            for (let item of this.state.activities[i]) {
                csvFile + this.processRow([
                    days[i].format("YYYY-MM-DD"),
                    item.start.format("HH:mm:ss"),
                    item.end.format("HH:mm:ss"),
                    item.name
                ]);
            }
        }

        const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            const filename = days[0].format("YYYY-MM-DD") + " to " + days[6].format("YYYY-MM-DD");
            link.setAttribute("download", filename + ".csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
        const activities = [[], [], [], [], [], [], []];
        const days = this.daysOfWeek();
        for (let i = 0; i < 7; i++) {
            listenForActivity(days[i], (querySnap) => {
                const activity = querySnap.docs.map(docSnap => docSnap.data());
                activities[i] = activity;
                this.setState({activities: activities});
            });
        }
    }

    render() {
        const days = this.daysOfWeek().map((day, index) => {
            return <Day key={day.format("ddd")} day={day} activity={this.state.activities[index]} />;
        });
        const summary = this.summarize(this.state.activities.flat());
        summary.sort((a, b) => a.value < b.value ? 1 : -1);
        return (
            <div className="week">
                <div className="week-row">
                    {days}
                </div>
                <button onClick={this.exportAsCSV}>Export this week&apos;s data</button>
                <div className="week-row">
                    <ActivityPie data={summary} size={500} />
                    <ActivityBar data={summary} size={500} />
                </div>
            </div>
        )

    }
}

Week.propTypes = {
    now: PropTypes.object
}

export default Week;
