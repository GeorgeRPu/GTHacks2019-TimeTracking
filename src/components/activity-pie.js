import React from 'react';
import PropTypes from 'prop-types';
import { PieChart,  Pie, Cell, Legend, Tooltip, } from 'recharts';

const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#bcbd22', '#17becf'];

class ActivityPie extends React.Component {
    render() {
        const data = this.props.data;
        const size = this.props.size;
        return (
            <div className="activity-pie">
                <PieChart width={size} height={size} label>
                    <Pie isAnimationActive={false} data={data} dataKey="value" cx={"50%"} cy={"50%"} outerRadius={size / 3}>
                        {
                            data.map((entry, index) => {
                                return <Cell
                                    key={"cell" + index}
                                    fill={entry.name === "blank" ? "grey" : colors[index % colors.length]} />;
                            })
                        }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
        )
    }
}

ActivityPie.propTypes = {
    data: PropTypes.array,
    size: PropTypes.number,
}

export default ActivityPie;
