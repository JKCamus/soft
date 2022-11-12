import { Button, Card, Radio } from "antd";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Common from "./common";
import Profession from "./profession";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

function App() {
  const [mode, setMode] = useState("common");

  let navigate = useNavigate();

  const handleProfession = () => {
    navigate("/profession");
  };
  const handleCommon = () => {
    navigate("/common");
  };

  return (
    <div className="App">
      <CardWrapper>
        <Card style={{ width: "33vw", height: "75vh" }}>
          <header className="App-header">
            <p>预测最高温度有效值为1500摄氏度</p>
          </header>
          <div className="inner">
            <div>
              <Routes>
                <Route path="profession" element={<Profession />} />
                <Route path="common" element={<Common />} />
                <Route path="/" element={<Navigate to="/common" />} />
              </Routes>
            </div>
          </div>
          <div className="radioGroupCls">
            <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
              <Radio.Button onClick={handleCommon} value="common">
                Common
              </Radio.Button>
              <Radio.Button onClick={handleProfession} value="profession">
                Profession
              </Radio.Button>
            </Radio.Group>
          </div>
        </Card>
      </CardWrapper>

      {/* <NavLink to={"/profession"}>Profile</NavLink>
      <NavLink to={"/common"}>Common</NavLink> */}
    </div>
  );
}

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  .inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content {
  }

  .radioGroupCls {
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    left: 0;
    margin-top: 20px;
    width: 100%;
  }
`;

export default App;
