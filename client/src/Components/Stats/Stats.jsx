import React from 'react';
import { Button, Col, Row, Statistic } from 'antd';
const Stats = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Statistic title="Active Employees" value={145} />
    </Col>
    <Col span={12}>
      <Statistic title="Account Balance (NGN)" value={112} precision={2} />
      <Button
        className='bg-blue-500 text-white font-bold mt-5'
        type="secondary"
      >
        Recharge
      </Button>
    </Col>
    <Col span={12}>
      <Statistic title="Active Employees" value={147} loading />
    </Col>
  </Row>
);
export default Stats;