import { BiMenu } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import Dropdown from "../../../components/inputs/Dropdown";
import { theme } from "../../../styles/theme";
import {
  ListGridItem,
  ListGridMain,
  LiveAccountMain,
  TabContent,
  TabShortMenu,
} from "../myaccount.styles";
import styled from "styled-components";
import { useMemo, useState } from "react";
import { device } from "../../../styles/device";
import RefetchQueries from "../../../components/RefetchQueries";
import { useGetUserArchivedAccounts } from "../../../utils/hooks/queryHooks";
import EmptyBoundary from "../../../components/EmptyBoundary";
import Loader from "../../../components/Loader";
import RowTable from "../../../components/Table/RowTable";
import GridTable from "../../../components/Table/GridTable";
import { formatArchivedData } from "../../../utils/helperTable";

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

export default function Deleted({
  pageTranslations,
  genericTranslations,
  isGrid,
  setIsGrid,
}) {
  const {
    sort: sortText,
    clmId,
    clmPlatform,
    clmAccType,
    clmOpendNew,
    clmCurrency,
    clmLeverage,
    clmBalance,
    clmEquity,
    clmActions,
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

  const headerData = [
    {
      fieldName: "Accounts",
      columnName: clmId,
      align: "center",
      maxWidth: "140px",
    },
    {
      fieldName: "Platform",
      columnName: clmPlatform,
      align: "center",
      maxWidth: "140px",
    },
    {
      fieldName: "AccType",
      columnName: clmAccType,
      align: "center",
      maxWidth: "140px",
    },
    {
      fieldName: "Opend",
      columnName: clmOpendNew,
      align: "center",
      minWidth: "200px",
    },
    {
      fieldName: "Closed",
      columnName: "Closed",
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
      minWidth: "120px",
      maxWidth: "120px",
    },
    {
      fieldName: "Equity",
      columnName: clmEquity,
      align: "center",
      minWidth: "120px",
      maxWidth: "120px",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const { data } = useGetUserArchivedAccounts({ initialData: [] });

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
          response={<div>No Deleted Accounts</div>}
        >
          <Relative>
            <Loader isLoading={isLoading} />
            {!isGrid ? (
              <RowTable
                hdata={headerData}
                rdata={formatArchivedData(sortedData, pageTranslations, isGrid)}
              />
            ) : (
              <GridTable
                hdata={headerData}
                rdata={formatArchivedData(sortedData, pageTranslations, isGrid)}
              />
            )}
          </Relative>
        </EmptyBoundary>
      </LiveAccountMain>
    </TabContent>
  );
}
