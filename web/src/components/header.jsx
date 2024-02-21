import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu, Typography, Button } from "antd";

import { useAuth } from "../context";

export function Header({ title, items, defaultSelectedKey }) {
    const [selectedKey, setSelectedKey] = useState(defaultSelectedKey)

    const navigate = useNavigate()
    const auth = useAuth()

    const handleLogout = (e) => {
        e.preventDefault()

        auth.logout()
        navigate("/login")
    }

    const handleItemClick = (item) => {
        return () => {
            navigate(item.href)
            setSelectedKey(item.key)
        }
    }

    return (
        <Layout.Header>
            <Typography.Text style={{ color: "#fff" }}>{title}</Typography.Text>
            <Menu theme="dark" mode="horizontal" selectedKeys={[selectedKey]} disabledOverflow>
                {items.map(item => (
                    <Menu.Item key={item.key} onClick={handleItemClick(item)}>
                        {item.text}
                    </Menu.Item>
                ))}
            </Menu>
            <Button
                type="text"
                style={{ color: "#fff", float: "right" }}
                onClick={handleLogout}
            >
                Logout
            </Button>
        </Layout.Header>
    );
}
