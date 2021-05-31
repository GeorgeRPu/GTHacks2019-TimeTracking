import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';
import * as serviceWorker from 'serviceWorker';

import dayjs from 'dayjs';
import Week from 'components/Week';

class App extends React.Component {
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
        return <div className="App">
            <h1>Time Trackr</h1>
            <button className="nav-button" onClick={this.handlePrevClick}>Prev week</button>
            <button className="nav-button" onClick={this.handleNextClick}>Next week</button>
            <Week dayjs={this.state.dayjs} />
        </div>
    }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
