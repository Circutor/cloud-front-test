import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Table, Button, Space } from 'antd';
import { DeleteOutlined, BarChartOutlined } from '@ant-design/icons';

import { GetBookmarks, DeleteBookmarks } from '../api/bookmarks';
import { GetBuildings } from '../api/buildings';
import { Header } from '../components'
import { useAuth } from '../context';

const { Content } = Layout;

const menuItems = [
    { key: "all", href: "/buildings", text: "All" },
    { key: "bookmarks", href: "/bookmarks", text: "Bookmarks" }
]

export default function BookmarksList() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [buildings, setBuildings] = useState({});

    const { token } = useAuth();

    useEffect(() => {
        // fetching in parallel
        Promise.all([GetBookmarks(token), GetBuildings(token)]).then(([bookmarks, bld]) => {
            const buildingsMap = bld.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {})

            setBuildings(buildingsMap);
            setRows(bookmarks);
        });
    }, [navigate]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'BuildingId',
            key: 'name',
            render: id => buildings[id]?.name || 'Unknown',
        },
        {
            title: 'Info',
            key: 'info',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<BarChartOutlined />} onClick={() => navigate(`/buildings/${record.BuildingId}`)} />
                </Space>
            ),
            align: 'center',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<DeleteOutlined />} onClick={() => deleteBookmark(record.ID)} />
                </Space>
            ),
            align: 'center',
        },
    ];

    const deleteBookmark = (id) => {
        DeleteBookmarks(id, token).then(() => {
            GetBookmarks(token).then(data => {
                setRows(data);
            });
        });
    };

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header defaultSelectedKey="bookmarks" items={menuItems} title="My Buildings" />
            <Content style={{ padding: '24px' }}>
                <Table columns={columns} dataSource={rows} rowKey="ID" />
            </Content>
        </Layout>
    );
}
