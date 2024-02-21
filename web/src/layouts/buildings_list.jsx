import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Table, Button } from 'antd';
import { StarOutlined, StarFilled, BarChartOutlined } from '@ant-design/icons';

import { GetBuildings } from '../api/buildings';
import { GetBookmarks, SaveBookmarks, DeleteBookmarks } from '../api/bookmarks';
import { Header } from '../components'
import { useAuth } from '../context';

import './buildingList.css'

const { Content } = Layout;

const menuItems = [
    { key: 'all', text: 'All', href: '/buildings' },
    { key: 'bookmarks', text: 'Bookmarks', href: '/bookmarks' },
]

const BuildingList = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [buildings, setBuildings] = useState([]);
    const [bookmarks, setBookmarks] = useState({});

    const { token } = useAuth();

    useEffect(() => {
        Promise.all([GetBuildings(token), GetBookmarks(token)]).then(([bld, bkm]) => {
            setBuildings(bld);

            const bookmarksMap = bkm.reduce((acc, curr) => {
                acc[curr.BuildingId] = curr;
                return acc;
            }, {});
            setBookmarks(bookmarksMap);
        });
    }, [navigate, location.pathname]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Info',
            dataIndex: 'id',
            key: 'info',
            render: (text, record) => (
                <Button icon={<BarChartOutlined />} onClick={() => goToBuildingMetrics(record.id)} />
            ),
            align: 'center',
        },
        {
            title: 'Favourites',
            dataIndex: 'id',
            key: 'favourites',
            render: (text, record) => (
                bookmarks[record.id] ? (
                    <Button icon={<StarFilled />} onClick={() => deleteBookmark(record.id)} />
                ) : (
                    <Button icon={<StarOutlined />} onClick={() => saveBookmark(record.id)} />
                )
            ),
            align: 'center',
        },
    ];

    const goToBuildingMetrics = (id) => {
        navigate(`/buildings/${id}`);
    };

    const saveBookmark = (id) => {
        SaveBookmarks(id, token).then(() => updateBookmarks());
    };

    const deleteBookmark = (id) => {
        if (bookmarks[id]) {
            DeleteBookmarks(bookmarks[id].ID, token).then(() => updateBookmarks());
        }
    };

    const updateBookmarks = () => {
        GetBookmarks(token).then(bld => {
            const bookmarksMap = bld.reduce((acc, curr) => {
                acc[curr.BuildingId] = curr;
                return acc;
            }, {});
            setBookmarks(bookmarksMap);
        });
    };

    return (
        <Layout className="layout" style={{ minHeight: '100vh' }}>
            <Header defaultSelectedKey={location.pathname === '/buildings' ? 'all' : 'bookmarks'} items={menuItems} title="My Buildings" />
            <Content style={{ padding: '50px' }}>
                <Table columns={columns} dataSource={buildings} rowKey="id" />
            </Content>
        </Layout>
    );
};

export default BuildingList;
