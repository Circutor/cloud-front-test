import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, DatePicker, Tabs } from 'antd';
import Moment from 'moment';
import Chart from "react-google-charts";

import { Header } from '../components'
import { useThrottle, useWindowResize } from '../hooks'
import { GetBuildingMetrics } from '../api/buildings';

import './buildingMetrics.css';

const { Content } = Layout;
const { TabPane } = Tabs;

const menuItems = [
    { key: 'all', text: 'All', href: '/buildings' },
    { key: 'bookmarks', text: 'Bookmarks', href: '/bookmarks' },
]

const BuildingMetrics = () => {
    const { buildingId } = useParams();
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(Moment('2021-01-01'));
    const [endDate, setEndDate] = useState(Moment('2022-08-01'));
    const [dateInterval, setDateInterval] = useState('daily');
    const [chartHeight, setChartHeight] = useState(0);

    const handleResize = useCallback(() => {
        setChartHeight(window.innerHeight - 65);
        // setter reference is stable
    }, [])

    const throttledHandleResize = useThrottle(handleResize, 100)

    useWindowResize(throttledHandleResize, true)

    useEffect(() => {
        const formattedStartDate = startDate.format('YYYY-MM-DD');
        const formattedEndDate = endDate.format('YYYY-MM-DD');
        GetBuildingMetrics(buildingId, formattedStartDate, formattedEndDate, dateInterval)
            .then(metricsData => {
                const tmpData = [
                    [{ type: "date", label: "Day" }, "Average energy consumption"]
                ];

                for (let i = 0; i < metricsData.length - 1; i++) {
                    const row = [new Date(Date.parse(metricsData[i].timestamp)), metricsData[i].value];
                    tmpData.push(row);
                }
                setData(tmpData);
            });
    }, [buildingId, startDate, endDate, dateInterval]);

    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    const handleTabChange = key => {
        setDateInterval(key === '2' ? 'hourly' : 'daily');
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header items={menuItems} defaultSelectedKey="metrics" title="My Buildings" />
            <Content className="content-wrapper">
                <div className="date-picker-wrapper">
                    <DatePicker value={startDate} onChange={handleStartDateChange} />
                    <DatePicker value={endDate} onChange={handleEndDateChange} />
                </div>
                <div className="tabs-wrapper">
                    <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                        <TabPane tab="Daily" key="1" />
                        <TabPane tab="Hourly" key="2" />
                    </Tabs>
                </div>
                <div className="chart-container">
                    <Chart
                        chartType="LineChart"
                        data={data}
                        width={'100%'}
                        height={chartHeight}
                        loader={<div>Loading Chart</div>}
                        options={{
                            hAxis: {
                                title: 'Day',
                            },
                            vAxis: {
                                title: 'Average Energy Consumption',
                            },
                        }}
                    />
                </div>
            </Content>
        </Layout>
    );
};

export default BuildingMetrics;

