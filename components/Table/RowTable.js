import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  flex-direction: column;
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

const TableHeaders = styled.div`
  display: flex;
  /* width: 100%; */
  /* padding-bottom: 20px; */
  /* border-bottom: 1px solid red; */
`;

const HeaderItem = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid #f6f6f6;
  justify-content: center;
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};

  padding: 5px 10px;
  font-size: 14px;
  flex: 1;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  /* border-bottom: 1px solid red; */
  justify-content: space-between;

  width: 100%;
`;

const RowItem = styled.div`
  flex: 1;
  display: flex;

  border-bottom: 1px solid #f6f6f6;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  min-width: ${({ minWidth }) => minWidth};
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 5px 10px;
  font-size: 12px;
`;

const RowTable = ({ hdata, rdata }) => {
  return (
    <TableContainer>
      <TableHeaders>
        {hdata.map((element, index) => (
          <HeaderItem
            key={index}
            maxWidth={element.maxWidth}
            minWidth={element.minWidth || "120px"}
          >
            <p>{element.columnName} </p>
          </HeaderItem>
        ))}
      </TableHeaders>
      {rdata.map((element, index) => (
        <Row key={index}>
          {hdata.map((obj, ind) => {
            const value = element[obj.fieldName];
            return (
              <RowItem
                key={ind}
                maxWidth={obj.maxWidth}
                minWidth={obj.minWidth || "120px"}
              >
                {value}
              </RowItem>
            );
          })}
        </Row>
      ))}
    </TableContainer>
  );
};

export default RowTable;
