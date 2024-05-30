import React, { useRef } from "react";
import styled from "styled-components";
import { findWithAttr } from "../../utils/functions";

const TableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  gap: 20px;
  /* flex-direction: column; */
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  ::-webkit-scrollbar {
    width: 1px;
    height: 10px;
    border-radius: 2%;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 15px;
    width: 5px;
    height: 1px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 15px;
    height: 5px;
    max-width: 1px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: auto; */
  border-radius: 5px;
  overflow: hidden;
  width: calc(100% / 3 - 40px / 3);
  /* width: 100%; */
  /* flex: 1; */
  min-width: 250px;
  max-width: 550px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const HeaderContainer = styled.div.attrs(({ currency }) => ({
  bg:
    ["ETH", "BTC", "USDT", "UST"].indexOf(currency.toUpperCase()) > -1
      ? "100%"
      : "33%",
  flag: currency.substr(0, 2).toLowerCase(),
}))`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid rgba(17, 17, 17, 0.89);
  justify-content: center;
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  background-color: #151515;
  color: #ffffff;
  font-size: 14px;
  flex: 1;
  font-weight: 600;
  position: relative;
  z-index: 2;

  & ::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    filter: blur(2px);
    z-index: -1;
    background: linear-gradient(
        to right,
        rgba(17, 17, 17, 1) ${({ bg }) => bg},
        rgba(17, 17, 17, 0.85) 100%
      ),
      url(https://flagcdn.com/h240/${({ flag }) => flag}.png) no-repeat center
        center / cover;
  }
`;

const HeaderFunctions = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  & div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    & p {
      font-size: 20px;
    }
  }
`;

const HeaderOptions = styled.div`
  display: flex;
  width: 100%;
`;

const CardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  flex: auto;
  background-color: #f7f7f7;
  width: 100%;
`;

const CardContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const GridTable = ({ hdata, rdata }) => {
  const getColumnNameByValue = (element, value) => {
    let key = Object.entries(element).filter((e, i) => e[1] === value)[0][0];
    let headerName = hdata[findWithAttr(hdata, "fieldName", key)].columnName;

    return headerName;
  };

  //reduce table of object to one object
  const newDataArray = hdata.reduce((total, curr, index) => {
    total = { ...total, [curr["fieldName"]]: curr["columnName"] };
    return total;
  }, []);

  return (
    <TableContainer>
      {rdata.map((element, index) => (
        <CardContainer key={index}>
          <HeaderContainer currency={element.currency}>
            <HeaderFunctions>
              <div>{element.Performance}</div>
              <div>{element.Actions}</div>
            </HeaderFunctions>
            <HeaderContent>
              <div>
                {newDataArray["Balance"]}
                <p>{element.Balance}</p>
              </div>
              <div>{element.Currency}</div>
            </HeaderContent>
            <HeaderOptions>{element.Options}</HeaderOptions>
          </HeaderContainer>
          <CardContentContainer>
            <CardContentItem>
              {newDataArray["AccType"]}
              {element.AccType}
            </CardContentItem>
            <CardContentItem>
              {newDataArray["Accounts"]}
              {element.Accounts}
            </CardContentItem>
            <CardContentItem>
              {newDataArray["Platform"]}
              {element.Platform}
            </CardContentItem>
            <CardContentItem>
              {newDataArray["Server"]}
              {element.Server}
            </CardContentItem>
          </CardContentContainer>
        </CardContainer>
      ))}
    </TableContainer>
  );
};

export default GridTable;
