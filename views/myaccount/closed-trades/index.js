import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";

import { TitleH1 } from "../../../components/Typography";
import aLinks from "../../../config/aLinks";
import { RightContainer } from "../../../styles/sharedstyles";
import Mcontainer from "../../../components/Mcontainer";
import { theme } from "../../../styles/theme";
import { formatDate } from "../../../utils/functions";
import {
  useGetAccountTrades,
  useGetUserAccountById,
} from "../../../utils/hooks/queryHooks";
import {
  AccountMain,
  LiveAccountMain,
  OpenLiveAccount,
  TabContent,
  TCa,
  TCp,
} from "../myaccount.styles";
import styled from "styled-components";
import ButtonSecondary from "../../../components/Buttons/ButtonSecondary";
import RowTable from "../../../components/Table/RowTable";
import { formatClosedData } from "../../../utils/helperTable";

const BtnContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 15px;
`;

const formatData = (data) =>
  data?.map((key) => {
    let result = {};
    if (key.positionId) {
      result.Ticket = <TCa>{key.positionId}</TCa>;
    }
    if (key.symbol) {
      result.Symbol = <TCp>{key.symbol}</TCp>;
    }
    if (key.action) {
      result.Action = <TCp>{key.action}</TCp>;
    }
    if (key.openTime) {
      result.Opend = <>{formatDate(key.openTime)}</>;
    }
    result.Closed = <>{formatDate(key.closeTime || 1674882132)}</>;
    if (key.openPrice) {
      result.OpenPrice = <>{key.openPrice}</>;
    }
    if (key.closePrice) {
      result.ClosedPrice = <>{key.closePrice}</>;
    }
    if (key.netProfit) {
      result.Profit = (
        <Profit isPositive={parseFloat(key.netProfit) > 0}>
          {key.netProfit}
        </Profit>
      );
    }
    result = { ...result, ...key };
    return result;
  }) || [];

export default function ClosedTrades({ pageTranslations }) {
  const {
    closeTrade,
    headT1,
    headT2,
    headT3,
    headT4,
    headT5,
    headT6,
    headT7,
    headT8,
    headT9,
    headT10,
  } = pageTranslations;

  const headerData = [
    {
      fieldName: "Ticket",
      columnName: headT1,
      options: "true",
      align: "center",
    },
    {
      fieldName: "Symbol",
      columnName: headT2,
      options: "",
      align: "center",
    },

    {
      fieldName: "Action",
      columnName: headT3,
      options: "",
      align: "center",
    },
    {
      fieldName: "Opend",
      columnName: headT4,
      options: "",
      align: "center",
    },
    {
      fieldName: "Closed",
      columnName: headT5,
      options: "",
      align: "center",
    },
    {
      fieldName: "OpenPrice",
      columnName: headT6,
      options: "",
      align: "center",
    },
    {
      fieldName: "ClosedPrice",
      columnName: headT7,
      options: "",
      align: "center",
    },
    {
      fieldName: "Profit",
      columnName: headT8,
      options: "",
      align: "center",
    },
  ];

  const router = useRouter();
  const { query } = router;

  const { accountId } = query;

  const [page, setPage] = useState(1);

  const { data: accountData } = useGetUserAccountById(accountId, {
    enabled: !!accountId,
  });

  const { data } = useGetAccountTrades(accountId, "closed", page, {
    enabled: !!accountId,
    initialData: [],
  });

  const { hasNextPage, hasPrevPage, totalPages } = data || {};

  const backAccountTab = () => {
    router.push(aLinks.myaccount);
  };

  return (
    <>
      <RightContainer>
        {/* <BecomePartnerSlider /> */}
        <Mcontainer bxshadow={theme.colors.primaryBoxShadow}>
          <AccountMain>
            <TitleH1>
              {closeTrade + ": "}
              <strong>
                {accountData?.account?.login_id}{" "}
                {accountData?.account?.platform}
              </strong>
            </TitleH1>
            <OpenLiveAccount>
              <a onClick={backAccountTab}>
                <IoIosArrowBack size={26} style={{ cursor: "pointer" }} />
              </a>
            </OpenLiveAccount>
          </AccountMain>
          <TabContent>
            <LiveAccountMain>
              <RowTable
                hdata={headerData}
                rdata={formatClosedData([...(data?.docs || [])])}
              />
            </LiveAccountMain>
          </TabContent>
          {totalPages > 1 && (
            <BtnContainer>
              <ButtonSecondary
                width={100}
                disabled={!hasPrevPage}
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Previous
              </ButtonSecondary>
              <ButtonSecondary
                width={100}
                disabled={!hasNextPage}
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </ButtonSecondary>
            </BtnContainer>
          )}
        </Mcontainer>
      </RightContainer>
    </>
  );
}
