import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { RiBarChartBoxFill, RiBarChartBoxLine } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import { BiTransferAlt } from "react-icons/bi";
import { CgCloseR } from "react-icons/cg";
import Link from "next/link";
import ModalHook from "./ModalHook";
import CloseAccount from "./modals/CloseAccount";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import ForgotPass from "./modals/ForgotPass";
import { FiDownload } from "react-icons/fi";

const Outer = styled.div`
  padding: 10px 0;
  background-color: ${theme.colors.mainWhite};
  /* box-shadow: rgba(0, 0, 0, 0.12) 0px 0px 8px 3px; */
  display: flex;
  flex-direction: column;
  gap: 7px;
  /* border-radius: 7px; */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 10px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.slightGray};
  }
`;

const CusLink = styled(Link)`
  display: contents;
`;

const CusP = styled.p`
  font-size: 12px;
  color: ${theme.colors.mainBlack};
  font-weight: 500;
  margin: 0;
`;

const AccountActions = ({ isDemo = false, account, pageTranslations }) => {
  const { closeTrade, openTrades, editLeverage, transferFunds, closeAcc } =
    pageTranslations;

  const options = [
    // {
    //   name: "Deposit",
    //   url: `/funds?accountId=${account.id}`,
    //   icon: <FiDownload size={18} color={theme.colors.primaryColor} />,
    //   isDisabled: isDemo,
    // },
    // {
    //   name: "Withdraw",
    //   url: `/funds?accountId=${account.id}&tab=withdrawal`,
    //   icon: <FiDownload size={18} color={theme.colors.primaryColor} />,
    //   isDisabled: isDemo,
    // },
    // {
    //   name: openTrades,
    //   url: `/open-trades?accountId=${account.id}`,
    //   icon: <RiBarChartBoxFill size={18} color={theme.colors.primaryColor} />,
    // },
    // {
    //   name: closeTrade,
    //   url: `closed-trades?accountId=${account.id}`,
    //   icon: <RiBarChartBoxLine size={18} color={theme.colors.primaryColor} />,
    // },
    {
      name: "Change Leverage",
      url: `/edit-leverage?accountId=${account.id}`,
      icon: <MdEditNote size={18} color={theme.colors.primaryColor} />,
    },
    {
      name: transferFunds,
      url: `/transfer-funds?accountId=${account.id}`,
      icon: <BiTransferAlt size={18} color={theme.colors.primaryColor} />,
      isDisabled: isDemo,
    },
    {
      name: "Reset password",
      url: "",
      icon: (
        <AiOutlineQuestionCircle size={18} color={theme.colors.primaryColor} />
      ),
      componentToShow: (
        <ForgotPass account={account} pageTranslations={pageTranslations} />
      ),
      isDisabled: !["mt4", "mt5"].includes(account.platform),
    },
    {
      name: closeAcc,
      url: "",
      icon: <CgCloseR size={18} color={theme.colors.primaryColor} />,
      componentToShow: (
        <CloseAccount account={account} pageTranslations={pageTranslations} />
      ),
    },
  ];
  return (
    <Outer>
      {options
        .filter((el) => !el.isDisabled)
        .map((option, index) => {
          if (option.componentToShow) {
            return (
              <ModalHook key={index} componentToShow={option.componentToShow}>
                {({ openModal }) => (
                  <Item onClick={openModal}>
                    {option.icon} <CusP>{option.name}</CusP>
                  </Item>
                )}
              </ModalHook>
            );
          }
          return (
            <CusLink href={option.url} key={index}>
              <Item>
                {option.icon} <CusP>{option.name}</CusP>
              </Item>
            </CusLink>
          );
        })}
    </Outer>
  );
};

export default AccountActions;
