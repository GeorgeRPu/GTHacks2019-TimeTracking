import React from 'react';
import PropTypes from 'prop-types';

import { getGoals } from 'db/firebase';

class CurrentWeekGoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goals: []
        };
        this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.checked);
    }

    async componentDidMount() {
        const querySnap = await getGoals(this.props.week);
        this.setState({goals: querySnap.docs.map(doc => doc.data())});
    }

    componentDidUpdate(prevProps) {
        if (this.props.week.isSame(prevProps.week, 'week')) {
            return;
        }
        this.componentDidMount();
    }

    render() {
        const goals = this.state.goals.map((goal, index) => {
            return (
                <li key={index}>
                    {index + 1}. {goal.goal}
                    <input type="checkbox" className="rounded mx-2 mb-1 p-0 h-4 align-middle" defaultChecked={goal.reached} onChange={this.handleChange} />
                </li>
            );
        });
        return (
            <div className="rounded bg-yellow-300 m-1 mb-2 p-1 shadow">
                <h2 className="text-xl text-center font-semibold">This Week&#39;s Goals</h2>
                <ol>{goals}</ol>
            </div>
        )
    }
}

class NextWeekGoals extends React.Component {
    render() {
        return (
            <div className="rounded bg-yellow-300 m-1 mb-2 p-1 shadow">
            <h2 className="text-xl text-center font-semibold">Next Week&#39;s Goals</h2>
            </div>
        )
    }
}

CurrentWeekGoals.propTypes = {
    week: PropTypes.object
};

export { CurrentWeekGoals, NextWeekGoals };
