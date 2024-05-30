import { useMemo, useState } from "react";
import { theme } from "../../../styles/theme";
import { useGetUserDemoAccounts } from "../../../utils/hooks/queryHooks";
import {
  ListGridItem,
  ListGridMain,
  LiveAccountMain,
  TabContent,
  TabShortMenu,
  TransactionTxt,
} from "../myaccount.styles";
import EmptyBoundary from "../../../components/EmptyBoundary";
import Dropdown from "../../../components/inputs/Dropdown";
import { BiMenu } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import OpenAccount from "../../../components/OpenAccount";

import RowTable from "../../../components/Table/RowTable";
import { formatDemoData } from "../../../utils/helperTable";
import GridTable from "../../../components/Table/GridTable";
import styled from "styled-components";
import RefetchQueries from "../../../components/RefetchQueries";
import Loader from "../../../components/Loader";
import { device } from "../../../styles/device";

const RefetchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: 10px;

  @media ${device.mobile} {
    margin-top: 15px;
  }
`;

const Relative = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default function Demo({
  pageTranslations,
  genericTranslations,
  isGrid,
  setIsGrid,
}) {
  const {
    myAccountDemo,
    dontHaveAccount,
    openLiveAccount,
    openDemoAccount,
    clmAccounts,
    clmId,
    clmPlatform,
    clmAccType,
    clmOpend,
    clmOpendNew,
    clmCurrency,
    clmLeverage,
    clmBalance,
    clmEquity,
    clmDetails,
    clmActions,
    sort: sortText,
    overview,
  } = pageTranslations;

  const { newest, oldest, balanceAsc, balanceDesc, plsSelect } =
    genericTranslations;

  const soption = [
    {
      name: oldest,
      sortFn: (a, b) => new Date(a) - new Date(b),
    },
    {
      name: newest,
      sortFn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    },
    {
      name: balanceAsc,
      sortFn: (a, b) => a.balance - b.balance,
    },
    {
      name: balanceDesc,
      sortFn: (a, b) => b.balance - a.balance,
    },
  ];

  const [sort, setSort] = useState(soption.find((el) => el.name === newest));

  const headerData = [
    {
      fieldName: "Accounts",
      columnName: clmId,
      align: "center",
    },
    {
      fieldName: "Platform",
      columnName: clmPlatform,
      align: "center",
    },
    // {
    //   fieldName: "Type",
    //   columnName: "Type",
    //   align: "center",
    // },
    {
      fieldName: "AccType",
      columnName: clmAccType,
      align: "center",
    },
    {
      fieldName: "Opend",
      columnName: clmOpendNew,
      align: "center",
    },
    {
      fieldName: "Currency",
      columnName: clmCurrency,
      align: "center",
    },
    {
      fieldName: "Leverage",
      columnName: clmLeverage,
      align: "center",
    },
    {
      fieldName: "Balance",
      columnName: clmBalance,
      align: "center",
    },
    {
      fieldName: "Equity",
      columnName: clmEquity,
      align: "center",
    },
    {
      fieldName: "Server",
      columnName: "Server",
      align: "center",
      minWidth: "150px",
      maxWidth: "150px",
    },
    // {
    //   fieldName: "Details",
    //   columnName: clmDetails,
    //   align: "center",
    // },
    {
      fieldName: "Actions",
      columnName: clmActions,
      align: "center",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetUserDemoAccounts({
    initialData: [],
  });

  const sortedData = useMemo(() => {
    if (sort.sortFn && data) {
      let result = [...data];
      result.sort(sort.sortFn);
      return result;
    } else {
      return data;
    }
  }, [data, sort.sortFn]);

  return (
    <TabContent>
      <TabShortMenu>
        <Dropdown
          label={`${sortText}:`}
          optionLabel={plsSelect}
          width={200}
          row
          disabledDefaultOption={false}
          options={soption.map((el) => ({
            label: el.name,
            value: el.name,
          }))}
          onChange={(e) => {
            if (e.target.value == "") {
              setSort({});
              return;
            }
            setSort(soption.find((el) => el.name == e.target.value));
          }}
          value={sort.name}
        />
        <RefetchContainer>
          <RefetchQueries
            onLoadingStateChange={(state) => {
              setIsLoading(state);
            }}
          />
          <ListGridMain>
            <ListGridItem
              data-active={!isGrid}
              onClick={() => setIsGrid(false)}
            >
              <BiMenu color={theme.colors.darkGray} size={20} />
            </ListGridItem>
            <ListGridItem data-active={isGrid} onClick={() => setIsGrid(true)}>
              <TbLayoutGrid color={theme.colors.darkGray} size={20} />
            </ListGridItem>
          </ListGridMain>
        </RefetchContainer>
      </TabShortMenu>
      <LiveAccountMain>
        <EmptyBoundary
          isEmpty={data?.length === 0}
          response={
            <OpenAccount
              label={dontHaveAccount}
              btnMsg={openDemoAccount}
              isDemo
            />
          }
        >
          <Relative>
            <Loader isLoading={isLoading} />
            {!isGrid ? (
              <RowTable
                hdata={headerData.filter((a) => a.fieldName != "Server")}
                rdata={formatDemoData(sortedData, pageTranslations, isGrid)}
              />
            ) : (
              <GridTable
                hdata={headerData.filter(
                  (a) => !["Opend", "Leverage", "Equity"].includes(a.fieldName)
                )}
                rdata={formatDemoData(sortedData, pageTranslations, isGrid)}
              />
            )}
          </Relative>
          <TransactionTxt>{myAccountDemo}</TransactionTxt>
        </EmptyBoundary>
      </LiveAccountMain>
    </TabContent>
  );
}
