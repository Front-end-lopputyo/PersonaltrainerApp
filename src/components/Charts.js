import { Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import _ from 'lodash';

export default function Charts() {

    const [data, setData] = useState([]);

    useEffect(() =>
        fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then((response) => response.json())
            .then((data) => {
                const groupedData = _.chain(data)
                    .groupBy('activity')
                    .map((items, name) => ({
                        name,
                        duration: _.sumBy(items, 'duration'),
                    }))
                    .value();
                setData(groupedData);
            });
    };

    return (
        <div style={{ width: '90%', height: '86vh', marginTop: '5%' }}>
            <ResponsiveContainer minWidth="100%" minHeight="100%">
                <BarChart data={data}>
                    <CartesianGrid />
                    <XAxis dataKey="name" />
                    <YAxis unit=" min" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill='#1976d2' />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}