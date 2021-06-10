import React from 'react';
import PropTypes from 'prop-types';
import Day from 'components/Day';

import * as utils from 'utils';

class Week extends React.Component {
    render() {
        const sunday = this.props.now.startOf("week");
        const days = [0, 1, 2, 3, 4, 5, 6].map((num) => {
            const day = sunday.add(num, "days")
            return <Day key={utils.dayOfWeek(day)} day={day} />;
        });
        return (
            <div className="Week">
                {days}
            </div>
        )

    }
}

Week.propTypes = {
    now: PropTypes.object
}

export default Week;
