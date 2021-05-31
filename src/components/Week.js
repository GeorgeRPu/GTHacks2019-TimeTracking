import React from 'react';
import Day from 'components/Day';

import { Dayjs } from 'dayjs';
import * as utils from 'utils';

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

Week.propTypes = {
    dayjs: Dayjs
}

export default Week;
