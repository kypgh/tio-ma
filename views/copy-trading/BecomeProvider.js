import aLinks from "@/config/aLinks";
import { device } from "@/styles/device";
import { theme } from "@/styles/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const BPOuter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background-color: ${theme.colors.mainWhite};
  border-radius: 7px;
  max-width: 700px;
  margin: auto;

  & > h2 {
    font-size: 24px;
  }

  & > ol {
    font-size: 16px;
    padding-left: 20px;
  }
`;

const CusLink = styled(Link)`
  background: ${theme.colors.primaryButtonLinearBG};
  color: ${theme.colors.mainWhite};
  font-weight: ${({ weight }) => weight || 700};
  font-size: ${({ size }) => size || "14px"};
  border-radius: 8px;
  padding: 10px 20px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease-in;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  width: ${({ width }) => `${width}px` || "100%"};
  text-align: center;

  &:hover {
    background-position-x: -10px;
  }

  @media ${device.mobile} {
    max-width: 100%;
  }
`;

const BecomeProvider = () => {
  return (
    <BPOuter>
      <h2>This is what you need to do next to become a provider</h2>
      <ol>
        <li>Create your copy trading account.</li>
        <li>
          The log in details will be sent by email with further instructions.
        </li>
        <li>Register to access the copy trading portal as a provider.</li>
        <li>
          Start trading well and create an attractive offer for followers to
          start copying you.
        </li>
      </ol>
      <CusLink
        href={{
          pathname: aLinks.myaccount,
          query: { tab: "open-live" },
        }}
        style={{ margin: "auto" }}
      >
        Get Started
      </CusLink>
    </BPOuter>
  );
};

export default BecomeProvider;
