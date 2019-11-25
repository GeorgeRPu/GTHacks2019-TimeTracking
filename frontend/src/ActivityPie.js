import React from 'react';
import { PieChart,  Pie, Cell, Legend, Tooltip, } from 'recharts';

const colors = ["Blue", "Orange", "Green", "Red"];


class ActivityPie extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <PieChart width={300} height={300} label>
                <Pie isAnimationActive={false} data={data} dataKey="value" cx={"50%"} cy={"50%"} outerRadius={100}>
                    {
                        data.map((entry, index) => {
                            return <Cell
                                key={"cell" + index}
                                fill={entry.name === "blank" ? "WhiteSmoke" : colors[index % colors.length]} />;
                        })
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        )
    }
}


export default ActivityPie;
