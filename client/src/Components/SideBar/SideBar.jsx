import React, { useContext } from "react";
import { HomeOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { DashboardContext } from "../../Context/DashboardContext";
const { Sider } = Layout;
const App = () => {
  const { collapsed, setCollapsed } = useContext(DashboardContext);
  console.log(collapsed);
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      className="!w-1/5"
    >
      <div className="text-3xl w-full flex justify-center items-center font-bold h-20 text-blue-400">
        Payflow
      </div>
      <div className="demo-logo-vertical" />
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        className="w-full"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <HomeOutlined />,
            label: "Dashboard",
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: "Payments",
            children: [
              {
                key: "g1",
                icon: null,
                label: "All Transactions",
              },
              {
                key: "g2",
                icon: null,
                label: "Reviews",
              },
              {
                key: "g3",
                icon: null,
                label: "Top-ups",
              },
              {
                key: "g4",
                icon: null,
                label: "Payouts",
              },
            ],
          },
        ]}
      />
    </Sider>
  );
};
export default App;
