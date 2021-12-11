import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class MyBarChart extends PureComponent {

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    layout="vertical"
                    width={500}
                    height={300}
                    data={this.props.data}
                    margin={{
                        top: 30,
                        right: 30,
                        left: 80,
                        bottom: 30,
                    }}
                >
                    <YAxis dataKey="name" type="category" />
                    <XAxis type="number" allowDecimals={false} tickCount={1} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#086C87" />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}