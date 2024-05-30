import React, { useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import { theme } from "../../../styles/theme";
import {
  useCurrentUser,
  useGetUserAccountById,
} from "../../../utils/hooks/queryHooks";
import {
  Table,
  TableRow,
  TableData,
  TableDataLabel,
  TableDataValue,
  BorderIcon,
} from "../openpaydView/OpenpaydView";
import { useNotification } from "../../../components/actionNotification/NotificationProvider";

const BankwireView = ({
  pageTranslations,
  selectedAccount,
  banwireObj,
  selectedCurrency,
}) => {
  const { getWire, accNum, benefName, benefBankName, bankAdress, refNo } =
    pageTranslations;

  const actionNotification = useNotification();

  const { data } = useGetUserAccountById(selectedAccount, {
    enabled: !!selectedAccount,
    initialData: {},
  });

  const copyTextToCliboard = (text) => {
    navigator.clipboard.writeText(text);
    actionNotification.SUCCESS("Copied to clipboard");
  };

  return (
    selectedCurrency && (
      <Table>
        {/* <TableRow>
          <TableData>
            <TableDataLabel>{accNum}:</TableDataLabel>
            <TableDataValue>
              {banwireObj[selectedCurrency].accountNumber}
            </TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(banwireObj[selectedCurrency].accountNumber)
              }
              color={theme.colors}
            >
              <MdContentCopy size={15}  />
            </BorderIcon>
          </TableData>
        </TableRow> */}
        <TableRow>
          <TableData>
            <TableDataLabel>Account Number:</TableDataLabel>
            <TableDataValue>
              {banwireObj[selectedCurrency].accountNumber}
            </TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(banwireObj[selectedCurrency].accountNumber)
              }
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <TableDataLabel>{benefName}:</TableDataLabel>
            <TableDataValue>
              {banwireObj[selectedCurrency].beneficiaryName}
            </TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(banwireObj[selectedCurrency].beneficiaryName)
              }
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <TableDataLabel>Beneficiary Address:</TableDataLabel>
            <TableDataValue>
              {banwireObj[selectedCurrency].beneficiaryAddress}
            </TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(
                  banwireObj[selectedCurrency].beneficiaryAddress
                )
              }
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <TableDataLabel>IBAN:</TableDataLabel>
            <TableDataValue>{banwireObj[selectedCurrency].iban}</TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(banwireObj[selectedCurrency].iban)
              }
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <TableDataLabel>SWIFT/BIC:</TableDataLabel>
            <TableDataValue>
              {banwireObj[selectedCurrency].swift}
            </TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(banwireObj[selectedCurrency].swift)
              }
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <TableDataLabel>{benefBankName}:</TableDataLabel>
            <TableDataValue>
              {banwireObj[selectedCurrency].bankName}
            </TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(banwireObj[selectedCurrency].bankName)
              }
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <TableDataLabel>{bankAdress}:</TableDataLabel>
            <TableDataValue>
              {banwireObj[selectedCurrency].bankAddress}
            </TableDataValue>
            <BorderIcon
              onClick={() =>
                copyTextToCliboard(banwireObj[selectedCurrency].bankAddress)
              }
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        <TableRow>
          <TableData>
            <TableDataLabel>{refNo} (Required):</TableDataLabel>
            <TableDataValue>{data?.account?.login_id}</TableDataValue>
            <BorderIcon
              onClick={() => copyTextToCliboard(data?.account?.login_id)}
              color={theme.colors}
            >
              <MdContentCopy size={15} />
            </BorderIcon>
          </TableData>
        </TableRow>
        {/* {openPaydInfo?.routingCodeEntries &&
        openPaydInfo?.routingCodeEntries.map((item) => (
          <TableRow>
            <TableData>
              <TableDataLabel>{item.routingCodeKey}:</TableDataLabel>
              {item.routingCodeValue}
              <BorderIcon
                onClick={() => copyTextToCliboard(item.routingCodeValue)}
                color={theme.colors}
              >
                <MdContentCopy size={15}  />
              </BorderIcon>
            </TableData>
          </TableRow>
        ))} */}
      </Table>
    )
  );
};

export default BankwireView;
