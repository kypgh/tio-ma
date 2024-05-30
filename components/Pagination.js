import React, { useState } from "react";
import styled from "styled-components";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import { theme } from "@/styles/theme";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 25px auto 40px;
`;
const Btn = styled.button`
  padding: 5px;
  border-radius: 7px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  max-width: 200px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  min-width: 30px;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Pagination = ({
  pages,
  onNext = () => {},
  onBack = () => {},
  onSelect = () => {},
}) => {
  const [page, setPage] = useState(1);

  if (pages <= 1) return null;

  return (
    <Container>
      <Btn
        onClick={() => {
          if (page === 1) return;
          setPage(page - 1);
          onBack(page - 1);
        }}
        disabled={page === 1}
      >
        <IoCaretBack />
      </Btn>
      {Array.from({ length: pages }).map((_, i) =>
        [i, i + 1, i + 2].includes(page) ? (
          <Btn
            key={i}
            onClick={() => {
              setPage(i + 1);
              onSelect(i + 1);
            }}
            style={{
              backgroundColor:
                page === i + 1 ? theme.colors.primaryColor : "transparent",
              color: page === i + 1 ? "#fff" : "#000",
            }}
          >
            {i + 1}
          </Btn>
        ) : null
      )}
      <Btn
        onClick={() => {
          if (page === pages) return;
          setPage(page + 1);
          onNext(page + 1);
        }}
        disabled={page === pages}
      >
        <IoCaretForward />
      </Btn>
    </Container>
  );
};

export default Pagination;
