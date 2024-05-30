import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { BiBarChartAlt2, BiLineChart, BiDoughnutChart } from "react-icons/bi";
import RowItem from "./RowItem";
import SearchInput from "@/components/SearchInput";
import { HiFilter } from "react-icons/hi";
import { useWindowSize } from "usehooks-ts";
import { IoIosCloseCircleOutline } from "react-icons/io";
import mt5RatingsService from "../../backend/services/mt5ratings.service";
import Pagination from "@/components/Pagination";
import { theme } from "@/styles/theme";

const Outest = styled.div`
  width: calc(100% + 30px);
  height: calc(100% + 15px);
  background-color: #f4f4f4;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: -15px;
  margin-top: 40px;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-left: 15px;
  padding-right: 15px;
  min-height: 400px;
`;

const Outer = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 28px;
`;

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.mainWhite};
  width: 100%;
  padding: 7px;
  border-radius: 5px;

  @media (max-width: 991px) {
    flex-direction: column;
    gap: 10px;
    background-color: transparent;
  }
`;

const Half = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  background-color: ${theme.colors.mainWhite};
  position: relative;
  border-radius: 5px;
`;

const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border: 1px solid #d4d4d4;
  border-radius: 10px;
  background-color: ${theme.colors.mainWhite};

  font-size: 12px;
`;

const ModalWrap = styled.div`
  @media (max-width: 991px) {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000080;
    z-index: 100;
  }
`;

const ratingData = [
  {
    name: "Rating",
    value: "defaultRankingPoints",
  },
];

const profitData = [
  {
    name: "Total Profit",
    value: "totalProfit",
  },
  {
    name: "Max Profit",
    value: "maxProfit",
  },
  {
    name: "Average Profit",
    value: "averageDailyProfit",
  },
  {
    name: "Average Loss",
    value: "averageDailyLoss",
  },
];

const maxDrawdownData = [
  {
    name: "Max Drawdown",
    value: "maxDrawdown",
  },
];

const equityData = [
  {
    name: "Equity",
    value: "account/equity",
  },
  {
    name: "Balance",
    value: "account/balance",
  },
];

const returnData = [
  {
    name: "Return (1Y)",
    value: "returnYear ",
  },
  {
    name: "Return (6M)",
    value: "returnHalfYear",
  },
  {
    name: "Return (3M)",
    value: "returnQuarter",
  },
  {
    name: "Return (1M)",
    value: "returnMonth",
  },
];

const allData = [
  ...ratingData,
  ...profitData,
  ...maxDrawdownData,
  ...equityData,
  ...returnData,
];

const getFilterFromString = (obj) => {
  const { filter, values, order } = obj;
  const { symbol, value } = values;
  return `${allData.find((el) => el.value === filter).name} ${symbol} ${value}`;
};

const SearchProviders = ({ data: initialData }) => {
  const [data, setData] = useState(initialData?.items);
  const { width } = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(false);
  const [filtersArray, setFiltersArray] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSearch = (value) => {
    let foundObject = filtersArray.find((item) => item.filter === value.filter);
    if (foundObject) {
      let cleanArray = filtersArray.filter(
        (item) => item.filter !== value.filter
      );
      foundObject.values = value.values;
      foundObject.order = value.order;
      setFiltersArray((prev) => [...cleanArray, foundObject]);
    } else {
      setFiltersArray((prev) => [...prev, value]);
    }
  };

  const fetchPage = async (v) => {
    let filterToSend = null;
    if (!!filtersArray && filtersArray.length > 0) {
      filterToSend = `(${filtersArray
        .map(
          (item) =>
            `(${item.filter} ${item.values.symbolValue} ${item.values.value}M)`
        )
        .join(" and ")})`;
    }
    return mt5RatingsService
      .getWidgets("rank", "asc", filterToSend, (v - 1) * 10)
      .then((res) => res.data);
  };

  useEffect(() => {
    if (filtersArray.length === 0) {
      setData(initialData?.items);
      return;
    }

    let filterToSend = null;
    if (!!filtersArray && filtersArray.length > 0) {
      filterToSend = `(${filtersArray
        .map(
          (item) =>
            `(${item.filter} ${item.values.symbolValue} ${item.values.value}M)`
        )
        .join(" and ")})`;
    }

    const lastChangedOrder = filtersArray[filtersArray.length - 1].order;

    mt5RatingsService
      .getWidgets("rank", lastChangedOrder, filterToSend)
      .then((res) => {
        setData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filtersArray]);

  useEffect(() => {
    setIsDesktop(width > 991);
  }, [width > 991]);

  const HalfModal = () => {
    return (
      <ModalWrap
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsModalOpen(false);
          }
        }}
      >
        <Half
          style={
            !isDesktop
              ? {
                  maxWidth: "300px",
                  borderRadius: "5px",
                  backgroundColor: colors.mainWhite,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "stretch",
                  gap: "0px",
                  zIndex: "100",
                  maxHeight: "500px",
                  overflow: "auto",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }
              : {}
          }
        >
          <Dropdown
            name={"Rating"}
            icon={<FiTrendingUp />}
            data={ratingData}
            label={"Rating"}
            onSearch={onSearch}
          />
          <Dropdown
            name={"Profit"}
            icon={<BiBarChartAlt2 />}
            data={profitData}
            label={"Profit"}
            onSearch={onSearch}
          />
          <Dropdown
            name={"Max Drawdown"}
            icon={<FiTrendingDown />}
            data={maxDrawdownData}
            label={"Max Drawdown"}
            onSearch={onSearch}
          />
          <Dropdown
            name={"Equity"}
            icon={<BiDoughnutChart />}
            data={equityData}
            label={"Equity"}
            onSearch={onSearch}
          />
          <Dropdown
            name={"Return"}
            icon={<BiLineChart />}
            data={returnData}
            label={"Return"}
            onSearch={onSearch}
          />
        </Half>
      </ModalWrap>
    );
  };

  return (
    <Outest>
      <Outer>
        <Title>Search Providers</Title>
        <Bar>
          {(isDesktop || isModalOpen) && <HalfModal />}

          <Half>
            <FiltersContainer>
              {filtersArray.map((item, index) => (
                <Filter key={index}>
                  <p>{getFilterFromString(item)}</p>
                  <IoIosCloseCircleOutline
                    size={14}
                    onClick={() => {
                      setFiltersArray((prev) => prev.filter((i) => item !== i));
                    }}
                  />
                </Filter>
              ))}
            </FiltersContainer>
            <SearchContainer>
              <SearchInput
                onSearch={async (e) => {
                  const v = e.target.value;
                  const filterToSend = `((contains(accountName, '${v}'))${
                    filtersArray.length > 0 && !!filtersArray
                      ? " and " +
                        filtersArray
                          .map(
                            (item) =>
                              `(${item.filter} ${item.values.symbolValue} ${item.values.value}M)`
                          )
                          .join(" and ")
                      : ""
                  })`;
                  await mt5RatingsService
                    .getWidgets("rank", "asc", filterToSend)
                    .then((res) => {
                      setData(res.data.items);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
              {!isDesktop && (
                <FilterBtnContainer>
                  <HiFilter
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  />
                </FilterBtnContainer>
              )}
            </SearchContainer>
          </Half>
        </Bar>
        {data &&
          data?.map((item, index) => <RowItem key={index} data={item} />)}
        <Pagination
          pages={
            filtersArray.length > 0 && !!filtersArray
              ? data.length / 10
              : Math.ceil(initialData?.count / 10)
          }
          onNext={async (v) => {
            const { items } = await fetchPage(v);
            setData(items);
          }}
          onBack={async (v) => {
            const { items } = await fetchPage(v);
            setData(items);
          }}
          onSelect={async (v) => {
            const { items } = await fetchPage(v);
            setData(items);
          }}
        />
      </Outer>
    </Outest>
  );
};

export default SearchProviders;
