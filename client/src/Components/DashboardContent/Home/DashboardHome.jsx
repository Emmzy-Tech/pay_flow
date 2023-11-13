import React from "react";
import { Layout, theme } from "antd";
import Stats from "../../Stats/Stats";
import DashNav from "../DashNav/DashNav";
import EmptyPlaceholder from "../../EmptyPlaceholder/EmptyPlaceholder";
import Aside from "../../Aside/Aside";

const DashboardHome = () => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <DashNav />
      {/* <Aside /> */}
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: colorBgContainer,
        }}
      >
        <Stats />
        <EmptyPlaceholder />
      </Content>
    </Layout>
  );
};

export default DashboardHome;
