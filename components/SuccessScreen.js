import React from "react";
import { Lottie } from "./Lottie";
import successAnimation from "../public/assets/animations/success.json";
import styled from "styled-components";
import ButtonPrimary from "./Buttons/ButtonPrimary";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 15px;
  background-color: #fff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  max-width: 340px;
  border-radius: 5px;
  margin: 20px auto;
  text-align: center;
  & > h2 {
    margin: 0;
  }
  & > p {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

const SuccessScreen = ({
  header,
  msg = "Success",
  onConfirm,
  btnMsg = "Confirm",
}) => {
  return (
    <OuterContainer>
      <Lottie
        animationData={successAnimation}
        width={100}
        height={100}
        mBottom={0}
      />
      {header && <h2>{header}</h2>}
      <p>{msg}</p>
      {onConfirm && <ButtonPrimary onClick={onConfirm}>{btnMsg}</ButtonPrimary>}
    </OuterContainer>
  );
};

export default SuccessScreen;
