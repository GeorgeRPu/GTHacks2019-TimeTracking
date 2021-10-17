import React from 'react';
import PropTypes from 'prop-types';
import { Bar, BarChart, Cell, LabelList, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#bcbd22", "#17becf"];

class ActivityPie extends React.Component {
    render() {
        const { data, width, height } = this.props;
        return (
            <div>
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
            <div>
                <BarChart width={size * 2} height={size} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" label={{ position: 'top' }}>
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

class AverageDay extends React.Component {
    getColor(name) {
        return colors[this.props.cmap.get(name) % colors.length];
    }

    render() {
        const { data, cmap, size } = this.props;
        let payload = [... new Set(data.map(item => item.name))];
        payload = payload.map(item => {
            return {
                value: item,
                type: "square",
                color: item === "blank" ? "grey" : colors[cmap.get(item) % colors.length]
            }
        });
        return (
            <div>
                <PieChart width={size} height={size}>
                    <Pie isAnimationActive={false} data={data} dataKey="value" innerRadius={size / 9} outerRadius={size / 3} startAngle={90} endAngle={60 - 360}>
                        {
                            data.map((entry, index) => {
                                return <Cell
                                    key={"cell" + index}
                                    fill={entry.name === "blank" ? "grey" : colors[cmap.get(entry.name) % colors.length]} />
                            })
                        }
                        <LabelList dataKey="hour" />
                    </Pie>
                    <Legend payload={payload} iconType="square" />
                </PieChart>
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

AverageDay.propTypes = {
    data: PropTypes.array,
    cmap: PropTypes.object,
    size: PropTypes.number
}

export { ActivityPie , ActivityBar, AverageDay };
