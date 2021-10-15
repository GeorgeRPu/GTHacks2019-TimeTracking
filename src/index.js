import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import * as serviceWorker from 'serviceWorker';
import Week from 'components/week';

import dayjs from 'dayjs';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: dayjs()
        }
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
    }

    handlePrevClick() {
        this.setState({now: this.state.now.subtract(1, "weeks").clone()});
    }

    handleNextClick() {
        this.setState({now: this.state.now.add(1, "weeks").clone()});
    }

    render() {
        return <div className="">
            <h1 className="text-center text-black text-3xl font-bold">Time Trackr</h1>
            <button className="rounded bg-blue-600 text-white m-1 p-1" onClick={this.handlePrevClick}>Prev week</button>
            <button className="rounded bg-blue-600 text-white p-1" onClick={this.handleNextClick}>Next week</button>
            <Week now={this.state.now} />
        </div>
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
