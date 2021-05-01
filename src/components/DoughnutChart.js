import React from "react"
import {
    PieChart, Pie, Cell, ResponsiveContainer, Legend
} from 'recharts';

export default function DoughnutChart(props) {

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

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <ResponsiveContainer>
            <PieChart>
                <Pie
                    isAnimationActive={false}
                    data={props.data}
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey={props.dataKey}
                    nameKey="name"
                    label={renderCustomizedLabel}
                >
                    {
                        props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
} 