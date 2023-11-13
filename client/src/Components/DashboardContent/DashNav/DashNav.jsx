import React, { useContext } from "react";
import { DashboardContext } from "../../../Context/DashboardContext";
import { Layout, Button, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header } = Layout;

const DashNav = () => {
    const { collapsed, setCollapsed } = useContext(DashboardContext);
    const {
        token: { colorBgContainer },
      } = theme.useToken();
  return (
    <Header
    style={{
      padding: 0,
      background: colorBgContainer,
    }}
  >
    <Button
      type="text"
      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      onClick={() => setCollapsed(!collapsed)}
      style={{
        fontSize: "16px",
        width: 64,
        height: 64,
      }}
      className=""
    />
  </Header>
  )
}

export default DashNav;