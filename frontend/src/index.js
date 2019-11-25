// react
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// firebase
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './config';

// dayjs
import dayjs from 'dayjs';
import * as utils from './utils';

// components
import ActivityItems from './ActivityItems';
import ActivityPie from './ActivityPie';

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const usageRef = db.collection("usage");
const Timestamp = firebase.firestore.Timestamp;


class ActivityForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            start: "",
            end: "",
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
        const dayjs = this.props.dayjs;
        const dateString = utils.dateString(dayjs);
        usageRef.doc(dateString).set({
            startOfDay: Timestamp.fromMillis(dayjs.startOf("day").valueOf()),
        }, {merge: true});
        const timeFormats = [
            "HH:mm:ss", "hh:mm:ss A", "hh:mm:ss a",
            "HH:mm", "hh:mm A", "hh:mm a",
        ];
        usageRef.doc(dateString).collection("activities").set({
            name: this.state.name,
            start: Timestamp.fromMillis(dayjs(this.state.start, timeFormats).valueOf()),
            end: Timestamp.fromMillis(dayjs(this.state.end, timeFormats).valueOf()),
        });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <table>
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
        );
    }
}


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
            const duration = utils.durationBetween(utils.ts2d(item.start), utils.ts2d(item.end));
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
        usageRef.doc(utils.dateString("2019-10-27")).collection("activities").on("value", (snapshot) => {
            console.log(snapshot.val());
        }, (error) => {
            console.log("The read failed: " + error);
        });
    }

    render() {
        return (
            <div className={dayjs().isSame(this.props.dayjs, "day") ? "Day" : "Day-inactive"}>
                <h2>{utils.dateString(this.props.dayjs)} ({utils.dayOfWeek(this.props.dayjs)})</h2>
                <ActivityItems activity={this.state.activity} />
                <ActivityForm dayjs={this.props.dayjs} />
                <ActivityPie data={this.state.summary} />
            </div>
        )
    }
}


class Week extends React.Component {
    render() {
        const sunday = this.props.dayjs.startOf("week");
        const days = [0, 1, 2, 3, 4, 5, 6].map((num) => {
            const dayjs = sunday.add(num, "days")
            return <Day key={utils.dayOfWeek(dayjs)} dayjs={dayjs} />;
        });
        return (
            <div className="Week">
                {days}
            </div>
        )

    }
}


class WeekWithNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dayjs: dayjs(),
        }
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    handlePrevClick() {
        this.setState({dayjs: this.state.dayjs.subtract(1, "weeks").clone()});
    }

    handleNextClick() {
        this.setState({dayjs: this.state.dayjs.add(1, "weeks").clone()});
    }

    render() {
        return (
            <div className="WeekWithNav">
                <button className="nav-button" onClick={this.handlePrevClick}>Prev week</button>
                <button className="nav-button" onClick={this.handleNextClick}>Next week</button>
                <Week dayjs={this.state.dayjs} />
            </div>
        )
    }
}


function App() {
    return (
        <div className="App">
            <h1>Time Tracker</h1>
            <WeekWithNav />
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
