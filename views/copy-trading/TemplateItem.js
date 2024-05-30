import React from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import Link from "next/link";
import { theme } from "@/styles/theme";
import ModalHook from "@/components/ModalHook";
import BecomeProvider from "./BecomeProvider";

const Outest = styled.div`
  flex: 0 0 auto;
  width: calc(100% / 5);
  padding: 0 5px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const Outer = styled.div`
  background-color: #f4f4f4;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  min-height: 400px;
`;

const IconWrap = styled.div`
  background-color: ${theme.colors.mainWhite};
  padding: 25px;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h3`
  font-size: 16px;
  color: #777777;
  text-align: center;
`;

const OtherIcon = styled(Link)`
  border: 2px solid ${theme.colors.primaryBlue};
  padding: 10px;
  border-radius: 50%;
  background-color: ${theme.colors.mainWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TemplateItem = ({ hasAccount }) => {
  return (
    <Outest>
      <Outer>
        <IconWrap>
          <FaUser size={80} color="#E1E2E3" />
        </IconWrap>
        <Title>Become a provider</Title>
        <ModalHook componentToShow={<BecomeProvider />}>
          {({ openModal }) =>
            hasAccount ? (
              <OtherIcon
                href={
                  "https://social-mt5.tiomarkets.com/portal/registration/provider"
                }
                target={"_blank"}
              >
                <AiOutlineForm size={30} color={theme.colors.primaryBlue} />
              </OtherIcon>
            ) : (
              <OtherIcon as={"div"} onClick={openModal}>
                <AiOutlineForm size={30} color={theme.colors.primaryBlue} />
              </OtherIcon>
            )
          }
        </ModalHook>
      </Outer>
    </Outest>
  );
};

export default TemplateItem;
