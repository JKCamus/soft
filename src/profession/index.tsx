import { Button, Form, InputNumber } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useClickAway } from "ahooks";

const Profession: React.FC = (props) => {
  const [slag, setSlag] = useState<string>();
  const [show, setShow] = useState(false);
  const [empty, setEmpty] = useState(false)
  const cf = useRef<HTMLButtonElement>(null);

  useClickAway(() => {
    setShow(false);
    setEmpty(false)
  }, cf);


  const ref = useRef(null);
  const [form] = useForm();
  const professionConfig = [
    {
      name: "SiO2",
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
    },
    {
      name: "Fe2O3",
      label: (
        <>
          ω{"("}
          <p>
            Fe
            <sub>2</sub>O<sub>3</sub>
          </p>
          {")"}
        </>
      ),
    },
    {
      name: "Al2O3",
      label: (
        <>
          ω{"("}
          <p>
            Al
            <sub>2</sub>O<sub>3</sub>
          </p>
          {")"}
        </>
      ),
    },
    {
      name: "K2O",
      label: (
        <>
          ω{"("}
          <p>
            K<sub>2</sub>O
          </p>
          {")"}
        </>
      ),
    },
    {
      name: "Na2O",
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
    },
    {
      name: "P2O5",
      label: (
        <>
          ω{"("}
          <p>
            P<sub>2</sub>O<sub>5</sub>
          </p>
          {")"}
        </>
      ),
    },
    {
      name: "CaO",
      label: (
        <>
          ω{"("}
          <p>CaO</p>
          {")"}
        </>
      ),
    },
    {
      name: "MgO",
      label: (
        <>
          ω{"("}
          <p>MgO</p>
          {")"}
        </>
      ),
    },
    {
      name: "idt",
      label: "请输入变形温度idt",
    },
  ];

  const onFinish = async (val) => {
    const A = val.CaO + val.MgO;
    const B = val.SiO2 + val.Fe2O3 + val.Al2O3;
    const C = val.K2O + val.Na2O + val.P2O5;
    const isNaN=Number.isNaN(A)||Number.isNaN(B)||Number.isNaN(C)


    if (isNaN) {
      setEmpty(true)
    }
    const idt = val.idt;
    if (0 <= A && A < 40 && idt > 1100) {
      if (B > 0 && B < 40 && C > 90 && C < 100) {
        setSlag("为轻微结渣或者不结渣");
      } else {
        setShow(true);
        setSlag("");
      }
    } else if (40 <= A && A < 50 && idt > 0 && idt < 1500) {
      if (B > 40 && B < 80 && C > 0 && C < 90) {
        setSlag("小结渣，中度可能");
      } else {
        setShow(true);
        setSlag("");
      }
    } else {
      if (B > 80 && B < 100 && idt < 1300 && idt > 0 && C > 0 && C < 100) {
        setSlag("严重结渣趋势");
      } else {
        setShow(true);
        setSlag("");
      }
    }
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      name="profession"
      form={form}
      ref={ref}
      labelAlign="right"
      labelCol={{ span: 12 }}
      autoComplete="off"
      onFinish={onFinish}
    >
      <ContentWrapper>
        <div>
          {professionConfig.map((item, index) => {
            return (
              <Form.Item label={item.label} key={item.name} name={item.name}>
                <InputNumber
                  style={{
                    width: "160px",
                  }}
                  controls={false}
                  max={index === 8 ? undefined : 100}
                  min={0}
                  addonAfter={index === 8 ? "℃" : "%"}
                />
              </Form.Item>
            );
          })}
        </div>

        <Form.Item labelCol={{ span: -4 }} label={"软化温度"}>
          <InputNumber
            style={{ width: "144px" }}
            value={slag}
            disabled
            controls={false}
          ></InputNumber>
        </Form.Item>
      </ContentWrapper>
      <ErrorInfo ref={cf} show={show}>
       {` 错误提示：${empty?'无效值！':'元素组分与热值相差过大！'}`}
      </ErrorInfo>
      <Form.Item wrapperCol={{ offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </Form.Item>
    </Form>
  );
};
export default Profession;

const ErrorInfo = styled.div<{ show: boolean }>`
  text-align: center;
  color: red;
  opacity: ${(props) => (props.show ? 100 : 0)};
  margin-bottom: 4px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
