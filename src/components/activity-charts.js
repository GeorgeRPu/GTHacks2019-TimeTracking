import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#bcbd22", "#17becf"];

class ActivityPie extends React.Component {
    render() {
        const { data, width, height } = this.props;
        return (
            <div className="w-full h-auto">
                <PieChart width={width} height={height} label>
                    <Pie isAnimationActive={false} data={data} dataKey="value" cx={"50%"} cy={"50%"} outerRadius={width / 3} paddingAngle={1}>
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

class ActivityBar extends React.Component {
    render() {
        const { data, size } = this.props;
        return (
            <div className="">
                <BarChart width={size * 2} height={size} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={colors[0]} label={{ position: 'top' }}>
                        {
                            data.map((entry, index) => {
                                return <Cell
                                    key={"cell" + index}
                                    fill={entry.name === "blank" ? "grey" : colors[index % colors.length]} />;
                            })
                        }
                    </Bar>
                </BarChart>
            </div>
        )
    }
}

ActivityPie.propTypes = {
    data: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number
}

ActivityBar.propTypes = {
    data: PropTypes.array,
    size: PropTypes.number
}

export { ActivityPie , ActivityBar };
