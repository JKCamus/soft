import { Button, Checkbox, Form, Input, Select, InputNumber, Card } from "antd";
import { useForm } from "antd/es/form/Form";

import React, { useRef, useState } from "react";
import styled from "styled-components";

const Common: React.FC = (props) => {
  const [tf, setTf] = useState<number>();
  const [ts, setTs] = useState<number>();
  const ref = useRef(null);
  const [form] = useForm();
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

  const handleChange = () => {
    const { validateFields } = form;
    form
      .validateFields(["ωSiO2"])
      .then((values) => {
        console.log("a", values);
        // Submit values
        // submitValues(values);
      })
      .catch((errorInfo) => {});
  };
  const onFinish = async (val) => {
    const tf =
      1398.625 - 6.524 * val.ωK2O - 1.56 * val.ωNa2O - 3.309 * val.ωP2O5 - 1.832 * val.ωSO3;
    setTf(tf);
    const ts = 1.322107 - 12.523 * val.ωK2O - 26.588 * val.ωNa2O + 5.129 * val.ωMgO;
    setTs(ts);
  };

  const name = (
    <>
      ω(
      <p>
        SiO
        <sub>2</sub>
      </p>
      )
    </>
  );

  const formConfig = [
    {
      name: "ωSiO2",
      label: (
        <>
          ω{"("}
          <p>
            SiO
            <sub>2</sub>
          </p>
          {")"}
        </>
      ),
      range: {
        d: 2.35,
        u: 91.02,
      },
    },
    {
      name: "ωCaO",
      label: (
        <>
          ω{"("}
          <p>CaO</p>
          {")"}
        </>
      ),
      range: {
        d: 1.34,
        u: 49.92,
      },
    },
    {
      name: "ωMgO",
      label: (
        <>
          ω{"("}
          <p>MgO</p>
          {")"}
        </>
      ),
      range: {
        d: 0,
        u: 34.39,
      },
    },
    {
      name: "ωNa2O",
      label: (
        <>
          ω{"("}
          <p>
            Na
            <sub>2</sub>O
          </p>
          {")"}
        </>
      ),
      range: {
        d: 0.13,
        u: 9.94,
      },
    },
    {
      name: "ωK2O",
      label: (
        <>
          ω{"("}
          <p>
            K<sub>2</sub>O
          </p>
          {")"}
        </>
      ),
      range: {
        d: 0.15,
        u: 50.22,
      },
    },
    {
      name: "ωP2O5",
      label: (
        <>
          ω{"("}
          <p>
            P<sub>2</sub>O<sub>5</sub>
          </p>
          {")"}
        </>
      ),
      range: {
        d: 0.43,
        u: 29.01,
      },
    },
    {
      name: "ωSO3",
      label: (
        <>
          ω{"("}
          <p>
            SO<sub>3</sub>
          </p>
          {")"}
        </>
      ),
      range: {
        d: 0,
        u: 12.69,
      },
    },
  ];

  return (
    <div>
      {/* <Select defaultValue="麦秆" onChange={handleChange} options={map}></Select>
      <Select defaultValue="梧桐木" onChange={handleChange} options={map2}></Select>
      <Select defaultValue="花生壳" onChange={handleChange} options={map3}></Select>
      <Input placeholder="请输入参数" /> */}
      <Form
        name="basic"
        form={form}
        ref={ref}
        labelAlign="right"
        labelCol={{ span: 8 }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <ContentWrapper>
          <div>
            {formConfig.map((item, index) => {
              return (
                <StyledFormItem
                  extra={`${"范围 " + item.range.d + "~" + item.range.u}`}
                  label={item.label}
                  key={item.name}
                  name={item.name}
                  rules={[
                    { required: true, message: `请输入${item.name}` },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (item.range.d <= value && value <= item.range.u) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(`${item.name}输入值不在范围内`));
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    style={{
                      width: "198px",
                    }}
                    controls={false}
                  />
                </StyledFormItem>
              );
            })}
          </div>
          <OutWrapper>
            <Form.Item labelCol={{ span: 10 }} label={"流动温度"}>
              <InputNumber value={tf} disabled controls={false}></InputNumber>
            </Form.Item>
            <Form.Item labelCol={{ span: 10 }} label={"软化温度"}>
              <InputNumber value={ts} disabled controls={false}></InputNumber>
            </Form.Item>
          </OutWrapper>
        </ContentWrapper>
        <InfoP>预测最高温度有效值为1500摄氏度</InfoP>
        <Form.Item wrapperCol={{ offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin: 0 60px; */
  align-items: flex-end;
`;

const InfoP = styled.p`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

const OutWrapper = styled.div`
  margin-bottom: 14px;
`;
const StyledFormItem = styled(Form.Item)`
  margin-bottom: 10px;
`;

export default Common;
