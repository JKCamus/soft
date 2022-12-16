import { Button, Input } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
const [name, setName] = useState('')
const [password, setPassword] = useState('')
const navigate=useNavigate()

  const handleName=(e)=>{
    setName(e.target.value)
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value)
  }
  const handleLogin=()=>{
    const [rightName,rightPassword]=['userName','123456']
    if (rightName===name&&rightPassword===password) {
      navigate('/common')
    }
  }
  return (
    <Container>
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Please Sign In</h2>
        <Input value={name} type="text" onChange={handleName} autoComplete="off" placeholder="userName" />
        <Input value={password} onChange={handlePassword} type="text" autoComplete="off" placeholder="password" />
        <h2>&nbsp;</h2>
        <Button onClick={handleLogin}>Enter</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  font-family: "Raleway", sans-serif;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 999;

  &:hover,
  &:active {
    .top,
    .bottom {
      &:before,
      &:after {
        margin-left: 200px;
        transform-origin: -200px 50%;
        transition-delay: 0s;
      }
    }

    .center {
      opacity: 1;
      transition-delay: 0.2s;
    }
  }

  .top,
  .bottom {
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 200vmax;
      height: 200vmax;
      top: 50%;
      left: 50%;
      margin-top: -100vmax;
      transform-origin: 0 50%;
      transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
      z-index: 10;
      opacity: 0.65;
      transition-delay: 0.2s;
    }
  }

  .top {
    &:before {
      transform: rotate(45deg);
      background: #e46569;
    }
    &:after {
      transform: rotate(135deg);
      background: #ecaf81;
    }
  }

  .bottom {
    &:before {
      transform: rotate(-45deg);
      background: #60b8d4;
    }
    &:after {
      transform: rotate(-135deg);
      background: #3745b5;
    }
  }

  .center {
    position: absolute;
    width: 400px;
    height: 400px;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.445, 0.05, 0, 1);
    transition-delay: 0s;
    color: #333;

    input {
      width: 100%;
      padding: 15px;
      margin: 5px;
      border-radius: 1px;
      border: 1px solid #ccc;
      font-family: inherit;
    }
  }
`;

export default Login;
