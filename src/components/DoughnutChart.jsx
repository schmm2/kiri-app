import React from "react"
import {
    PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';

export default function DoughnutChart(props) {
    //console.log(props);

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, value
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        // console.log("render custom labels");
        return (
            <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
                {value}
            </text>
        );
    }

    const COLORS = ['#36cfc9', '#bfbfbf', '#7cb305', '#08979c', '#1890ff', '#eb2f96'];

    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    isAnimationActive={false}
                    data={props.data}
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey={props.dataKey ? props.dataKey : 'count'}
                    nameKey="name"
                    label={renderCustomizedLabel}>
                    {
                        props.data && (props.data.length > 0) && props.data.map((entry, index) => {
                            if (entry.color) { // defined color
                                return <Cell key={`cell-${index}`} fill={entry.color} />
                            }
                            else {  // random color
                                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            }
                        })
                    }
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}