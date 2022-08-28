import React from 'react';
import ReactDOM from 'react-dom/client';
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

    hanldeCurrentClick() {
        this.setState({now: dayjs()});
    }

    handleNextClick() {
        this.setState({now: this.state.now.add(1, "weeks").clone()});
    }

    render() {
        return <div className="">
            <h1 className="text-center text-black text-3xl font-bold">Time Trackr</h1>
            <button className="rounded bg-blue-600 hover:bg-blue-700 text-white m-1 p-1 shadow" onClick={this.handlePrevClick}>Prev week</button>
            <button className="rounded bg-blue-600 hover:bg-blue-700 text-white m-1 p-1 shadow" onClick={this.handlePrevClick}>Current week</button>
            <button className="rounded bg-blue-600 hover:bg-blue-700 text-white p-1 shadow" onClick={this.handleNextClick}>Next week</button>
            <Week now={this.state.now} />
        </div>
    }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
