import { theme } from "../../../styles/theme";
import {
  ListGridItem,
  ListGridMain,
  LiveAccountMain,
  TabContent,
  TabShortMenu,
  TransactionTxt,
} from "../myaccount.styles";

import { useGetUserLiveAccounts } from "../../../utils/hooks/queryHooks";
import { useMemo, useState } from "react";
import EmptyBoundary from "../../../components/EmptyBoundary";
import Dropdown from "../../../components/inputs/Dropdown";
import { TbLayoutGrid } from "react-icons/tb";
import { BiMenu } from "react-icons/bi";
import OpenAccount from "../../../components/OpenAccount";
import RowTable from "../../../components/Table/RowTable";
import { formatAccountsData } from "../../../utils/helperTable";
import GridTable from "../../../components/Table/GridTable";
import RefetchQueries from "../../../components/RefetchQueries";
import styled from "styled-components";
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

export default function Live({
  pageTranslations,
  genericTranslations,
  isGrid,
  setIsGrid,
}) {
  const {
    myAccountDemo,
    dontHaveAccount,
    openLiveAccount,
    clmAccounts,
    clmPlatform,
    clmAccType,
    clmOpend,
    clmId,
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
    {
      name: "Equity Ascending",
      sortFn: (a, b) => a.equity - b.equity,
    },
    {
      name: "Equity Descending",
      sortFn: (a, b) => b.equity - a.equity,
    },
  ];

  const [sort, setSort] = useState(soption.find((el) => el.name === newest));

  const headerdata = [
    {
      fieldName: "Accounts",
      columnName: clmId,
      align: "center",
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      fieldName: "Platform",
      columnName: clmPlatform,
      align: "center",
      minWidth: "150px",
      maxWidth: "150px",
    },
    {
      fieldName: "AccType",
      columnName: clmAccType,
      align: "center",
      minWidth: "150px",
      minWidth: "150px",
    },
    {
      fieldName: "Opend",
      columnName: clmOpendNew,
      align: "center",
      minWidth: "200px",
    },

    {
      fieldName: "Currency",
      columnName: clmCurrency,
      align: "center",
      minWidth: "100px",
      maxWidth: "100px",
    },

    {
      fieldName: "Leverage",
      columnName: clmLeverage,
      align: "center",
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      fieldName: "Balance",
      columnName: clmBalance,
      align: "center",
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      fieldName: "Equity",
      columnName: clmEquity,
      align: "center",
      minWidth: "100px",
      maxWidth: "100px",
    },
    {
      fieldName: "Performance",
      columnName: "Performance",
      align: "center",
      minWidth: "200px",
    },
    {
      fieldName: "Actions",
      columnName: clmActions,
      align: "center",
      minWidth: "200px",
    },
    {
      fieldName: "Server",
      columnName: "Server",
      align: "center",
      minWidth: "150px",
      maxWidth: "150px",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetUserLiveAccounts({ initialData: [] });

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
            <OpenAccount label={dontHaveAccount} btnMsg={openLiveAccount} />
          }
        >
          <Relative>
            <Loader isLoading={isLoading} />
            {!isGrid ? (
              <RowTable
                hdata={headerdata.filter((a) => a.fieldName !== "Server")}
                rdata={formatAccountsData(sortedData, pageTranslations, isGrid)}
              />
            ) : (
              <GridTable
                hdata={headerdata}
                rdata={formatAccountsData(sortedData, pageTranslations, isGrid)}
              />
            )}
          </Relative>
          <TransactionTxt>{myAccountDemo}</TransactionTxt>
        </EmptyBoundary>
      </LiveAccountMain>
    </TabContent>
  );
}
