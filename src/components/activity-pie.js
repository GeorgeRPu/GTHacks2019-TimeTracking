import React from 'react';
import PropTypes from 'prop-types';
import { PieChart,  Pie, Cell, Legend, Tooltip, } from 'recharts';

const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

class ActivityPie extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <div className="activity-pie">
                <PieChart width={300} height={300} label>
                    <Pie isAnimationActive={false} data={data} dataKey="value" cx={"50%"} cy={"50%"} outerRadius={100}>
                        {
                            data.map((entry, index) => {
                                return <Cell
                                    key={"cell" + index}
                                    fill={entry.name === "blank" ? "Grey" : colors[index % colors.length]} />;
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
    data: PropTypes.array
}

export default ActivityPie;
