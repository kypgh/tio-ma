import { useEffect, useState } from "react";
import { MdOutlineDone, MdOutlinePending } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import { theme } from "../../styles/theme";
import { useGetUserAccountHistory } from "../../utils/hooks/queryHooks";
import { LiveAccountMain, TCt } from "../myaccount/myaccount.styles";
import { TCs } from "./transactionHistory.styles";
import { formatDate } from "../../utils/functions";
import EmptyBoundary from "../../components/EmptyBoundary";
import useUserFlags from "../../utils/hooks/useUserFlags";
import { useRouter } from "next/router";
import AccountSelect from "../../components/AccountSelect";
import RowTable from "../../components/Table/RowTable";
import { formatTransactionData } from "../../utils/helperTable";

const typesMap = {
  deposit: "Deposit",
  withdrawal: "Withdrawal",
  balance_operation_deposit: "Deposit",
  balance_operation_withdrawal: "Withdrawal",
  credit_operation_deposit: "Bonus",
  credit_operation_withdrawal: "Bonus",
  transfer_between_accounts: "Transfer",
};

const statusIcons = {
  approved: (
    <MdOutlineDone
      className="ico-center"
      size={12}
      color={theme.colors.primaryColorGreen}
    />
  ),
  rejected: (
    <IoMdClose
      className="ico-center"
      size={12}
      color={theme.colors.primaryRed}
    />
  ),
  pending: (
    <MdOutlinePending
      className="ico-center"
      size={12}
      color={theme.colors.pending}
    />
  ),
};

const formatData = (data) => {
  return (
    data?.map((key, idx) => {
      if (key.updatedAt) {
        key.Date = (
          <TCt width={"50%"} fweight={"400"}>
            {formatDate(key.updatedAt)}
          </TCt>
        );
      }
      if (key.transaction_type) {
        key.Type = (
          <TCt
            style={{ textTransform: "capitalize" }}
            colors={
              key.transaction_type.includes("deposit")
                ? theme.colors.primaryBlue
                : theme.colors.primaryRed
            }
          >
            {typesMap[key.transaction_type]}
          </TCt>
        );
      }
      if (key.variable1 || key.transferAccount) {
        key.Details = (
          <TCt fweight={"400"}>
            {key.variable1 ||
              `${intent[key.intent]} ${key.transferAccount?.login_id}`}
          </TCt>
        );
      }
      if (key.transaction_status) {
        key.Status = (
          <TCs
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              textTransform: "capitalize",
            }}
          >
            {statusIcons[key.transaction_status]}
            {key.transaction_status}
          </TCs>
        );
      }
      if (key.currency) {
        key.Currency = <TCt fweight={"400"}>{key.currency}</TCt>;
      }
      if (key.amount) {
        key.Amount = (
          <TCt
            colors={
              key.transaction_type.includes("deposit")
                ? theme.colors.primaryBlue
                : theme.colors.primaryRed
            }
            fweight={"400"}
          >
            {(+key.amount)?.toFixed(2)}
          </TCt>
        );
      }
      return key;
    }) || []
  );
};

export default function TransactionHistory({ pageTranslations }) {
  const {
    accountDetailsLabel,
    labelDate,
    labelType,
    labelDetails,
    labelCurrency,
    labelAmount,
    labelStatus,
    dontHaveAccount,
    openLiveAccount,
    noTransHis,
  } = pageTranslations;

  const router = useRouter();

  const selectedAccount = router.query.accountId || "";
  const setSelectedAccount = (v) => {
    router.push(
      {
        query: { tab: "transaction-history", accountId: v },
      },
      null,
      { shallow: true }
    );
  };

  const { data } = useGetUserAccountHistory(selectedAccount, {
    enabled: !!selectedAccount,
  });

  const { isEmailVerified } = useUserFlags();

  useEffect(() => {
    if (router.query?.account) {
      setSelectedAccount(router.query?.account);
    }
  }, [router.query]);

  const headerData = [
    {
      fieldName: "Date",
      columnName: labelDate,
      options: "true",
      align: "left",
      minWidth: "300px",
    },
    {
      fieldName: "Type",
      columnName: labelType,
      options: "",
      align: "left",
    },
    {
      fieldName: "Details",
      columnName: labelDetails,
      options: "",
      align: "left",
    },
    {
      fieldName: "Currency",
      columnName: labelCurrency,
      options: "",
      align: "",
    },
    {
      fieldName: "Amount",
      columnName: labelAmount,
      options: "",
      align: "left",
    },
    {
      fieldName: "Status",
      columnName: labelStatus,
      options: "",
      align: "",
    },
  ];

  return (
    <>
      <RightContainer>
        {/* <BecomePartnerSlide /> */}
        <Mcontainer pall={"25px 35px"}>
          <AccountSelect
            label={accountDetailsLabel}
            onChange={(val) => setSelectedAccount(val._id)}
            width={"420px"}
            enviroment="live"
            value={selectedAccount}
          />
          {isEmailVerified && (
            <LiveAccountMain>
              {!!selectedAccount && (
                <EmptyBoundary
                  isEmpty={data?.docs?.length === 0}
                  response={<h3>{noTransHis}</h3>}
                >
                  <RowTable
                    hdata={headerData}
                    rdata={formatTransactionData(data?.docs, typesMap)}
                  />
                </EmptyBoundary>
              )}
            </LiveAccountMain>
          )}
        </Mcontainer>
      </RightContainer>
    </>
  );
}
