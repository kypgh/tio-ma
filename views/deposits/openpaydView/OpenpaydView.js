import React, { useEffect, useState } from "react";
import agent from "../../../utils/agent";
import styled from "styled-components";
import { device } from "../../../styles/device";
import { MdContentCopy } from "react-icons/md";
import {
  useCurrentUser,
  useGetUserAccountById,
} from "../../../utils/hooks/queryHooks";
import ButtonSecondary from "../../../components/Buttons/ButtonSecondary";
import { theme } from "../../../styles/theme";
import Loader from "../../../components/Loader";

export const Table = styled.div`
  position: relative;
  font-family: arial, sans-serif;
  border-collapse: collapse;
  border: 1px solid #dddddd;
  border-radius: 10px;
  max-width: 770px;
  width: 100%;

  @media ${device.tablet} {
    max-width: 100%;
  }

  @media ${device.mobile} {
    max-width: 450px;
    width: 100%;
  }
`;

export const TableRow = styled.div`
  &:nth-child(even) {
    background-color: #dddddd;
  }
  height: 25%;
`;

export const TableData = styled.div`
  text-align: left;
  padding: 8px;
  display: flex;
  width: 100%;
  align-items: center;

  @media ${device.tablet} {
    font-size: 16px;
    flex-wrap: wrap;
  }

  @media ${device.mobile} {
    font-size: 12px;
    gap: 5px;
  }
`;

export const TableDataLabel = styled.div`
  font-weight: bold;
  min-width: 200px;
`;

export const TableDataValue = styled.div`
  @media ${device.tablet} {
    /* max-width: 50%; */
    padding-right: 25px;
  }

  @media ${device.mobile} {
    /* width: 50%; */
  }
`;

export const BorderIcon = styled.div`
  border: 2px solid;
  border-radius: 5px;
  border-color: ${(props) => props.color.lightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-left: auto;

  &:hover {
    background-color: ${(props) => props.color.primaryColor};
    cursor: pointer;
    border-color: ${(props) => props.color.primaryColor};
  }

  & > svg {
    color: ${(props) => props.color.lightGray};
  }

  &:hover > svg {
    color: #ffffff;
  }
`;

const OpenpaydView = ({ selectedAccount, pageTranslations }) => {
  const { getWire, accNum, benefName, benefBankName, bankAdress, refNo } =
    pageTranslations;
  const [openPaydInfo, setOpenPaydInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { data: currentUser } = useCurrentUser();

  const account = useGetUserAccountById(selectedAccount, {
    enabled: !!selectedAccount,
  });

  useEffect(() => {
    setOpenPaydInfo("");
  }, [selectedAccount]);

  const copyTextToCliboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getOpenPayedDetails = async () => {
    if (selectedAccount) {
      setIsLoading(true);
      await agent()
        .getOpenPaydAccountDetails({ accountId: selectedAccount })
        .then((res) => {
          setOpenPaydInfo(res.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setOpenPaydInfo("");
    }
  };
  return !openPaydInfo && !isLoading ? (
    <ButtonSecondary onClick={() => getOpenPayedDetails()}>
      {getWire}
    </ButtonSecondary>
  ) : (
    <Table>
      <Loader isLoading={isLoading} />
      <TableRow>
        <TableData>
          <TableDataLabel>{accNum}:</TableDataLabel>
          <TableDataValue>{openPaydInfo.accountNumber}</TableDataValue>
          <BorderIcon
            onClick={() => copyTextToCliboard(openPaydInfo.accountNumber)}
            color={theme.colors}
          >
            <MdContentCopy size={15} color={theme.colors.lightGray} />
          </BorderIcon>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>
          <TableDataLabel>{benefName}:</TableDataLabel>
          <TableDataValue>
            {currentUser.first_name} {currentUser.last_name}
          </TableDataValue>
          <BorderIcon
            onClick={() =>
              copyTextToCliboard(
                `${currentUser.first_name} ${currentUser.last_name}`
              )
            }
            color={theme.colors}
          >
            <MdContentCopy size={15} color={theme.colors.lightGray} />
          </BorderIcon>
        </TableData>
      </TableRow>
      {/* <TableRow>
      <TableData>
        <TableDataLabel>Beneficiary Address:</TableDataLabel>
        {openPaydInfo.bankAddress}
      </TableData>
    </TableRow> */}
      <TableRow>
        <TableData>
          <TableDataLabel>IBAN:</TableDataLabel>
          <TableDataValue>{openPaydInfo.iban}</TableDataValue>
          <BorderIcon
            onClick={() => copyTextToCliboard(openPaydInfo.iban)}
            color={theme.colors}
          >
            <MdContentCopy size={15} color={theme.colors.lightGray} />
          </BorderIcon>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>
          <TableDataLabel>SWIFT/BIC:</TableDataLabel>
          {openPaydInfo?.swift} {openPaydInfo?.bic}
          <BorderIcon
            onClick={() =>
              copyTextToCliboard(
                `${openPaydInfo?.swift ?? ""} ${openPaydInfo?.bic ?? ""}`
              )
            }
            color={theme.colors}
          >
            <MdContentCopy size={15} color={theme.colors.lightGray} />
          </BorderIcon>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>
          <TableDataLabel>{benefBankName}:</TableDataLabel>
          {openPaydInfo?.bankName}
          <BorderIcon
            onClick={() => copyTextToCliboard(openPaydInfo?.bankName)}
            color={theme.colors}
          >
            <MdContentCopy size={15} color={theme.colors.lightGray} />
          </BorderIcon>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>
          <TableDataLabel>{bankAdress}:</TableDataLabel>
          {openPaydInfo?.bankAddress}
          <BorderIcon
            onClick={() => copyTextToCliboard(openPaydInfo?.bankAddress)}
            color={theme.colors}
          >
            <MdContentCopy size={15} color={theme.colors.lightGray} />
          </BorderIcon>
        </TableData>
      </TableRow>
      <TableRow>
        <TableData>
          <TableDataLabel>{refNo}:</TableDataLabel>
          {account?.data?.account?.login_id}
          <BorderIcon
            onClick={() => copyTextToCliboard(account?.data?.account?.login_id)}
            color={theme.colors}
          >
            <MdContentCopy size={15} color={theme.colors.lightGray} />
          </BorderIcon>
        </TableData>
      </TableRow>
      {openPaydInfo?.routingCodeEntries &&
        openPaydInfo?.routingCodeEntries.map((item) => (
          <TableRow>
            <TableData>
              <TableDataLabel>{item.routingCodeKey}:</TableDataLabel>
              {item.routingCodeValue}
              <BorderIcon
                onClick={() => copyTextToCliboard(item.routingCodeValue)}
                color={theme.colors}
              >
                <MdContentCopy size={15} color={theme.colors.lightGray} />
              </BorderIcon>
            </TableData>
          </TableRow>
        ))}
    </Table>
  );
};

export default OpenpaydView;
