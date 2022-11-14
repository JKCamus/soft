import { Button, Checkbox, Form, Input,Select } from 'antd';

import React from "react";

const Common: React.FC = (props) => {
  const StrawStalkType = ["麦秆", "稻秆", "玉米秆", "其他"];
  const woodClass = ["梧桐木", "白杨木", "木屑", "其他"];
  const other = ["花生壳", "瓜子壳", "稻壳以及酒糟", "其他"];
  const map = StrawStalkType.map((item, index) => ({
    label: item,
    value: index,
  }));
  const map2 = woodClass.map((item, index) => ({
    label: item,
    value: index,
  }));
  const map3 = other.map((item, index) => ({
    label: item,
    value: index,
  }));

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <p>Common</p>
      {/* <Select defaultValue="麦秆" onChange={handleChange} options={map}></Select>
      <Select defaultValue="梧桐木" onChange={handleChange} options={map2}></Select>
      <Select defaultValue="花生壳" onChange={handleChange} options={map3}></Select>
      <p>录入参数</p>
      <Input placeholder="请输入参数" /> */}
      <Form
      name="basic"
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      autoComplete="off"
    >
      <Form.Item
        label="ωSiO2"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

    </div>
  );
};
export default Common;
