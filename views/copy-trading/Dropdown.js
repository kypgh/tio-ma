import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BiChevronDown } from "react-icons/bi";
import Checkbox from "@/components/Checkbox";
import EqualsInput from "@/components/EqualsInput";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { theme } from "@/styles/theme";

const Outest = styled.div`
  position: relative;
  width: fit-content;
  max-width: 160px;
`;

const Outer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border: 1px solid #f4f4f4;
  border-radius: 5px;
  cursor: pointer;
  gap: 5px;

  & > svg {
    color: #777777;
    font-size: 14px;
  }

  & > p {
    font-size: 14px;
    color: #777777;
  }
`;

const DropdownOuter = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${theme.colors.mainWhite};
  border-radius: 5px;
  border: 1px solid #f4f4f4;
  padding: 20px 10px;
  z-index: 100;
  box-shadow: 0 0 5px #f4f4f4;
  min-width: 200px;

  display: flex;
  flex-direction: column;

  @media (max-width: 991px) {
    position: unset;
    max-width: 300px;
    min-width: unset;
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
`;

const OrderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid #d4d4d4;
  padding-bottom: 10px;
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 0;
`;

const SearchBtn = styled.button`
  border: none;
  outline: none;
  background-color: ${theme.colors.mainWhite};
  color: ${theme.colors.primaryColor};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid ${theme.colors.primaryColor};

  &:hover {
    background-color: ${theme.colors.primaryColor};
    color: ${theme.colors.mainWhite};
  }
`;

const Dropdown = ({
  name,
  icon: Icon,
  label,
  data = [],
  onSearch = () => {},
  closeModal,
}) => {
  const [open, setOpen] = useState(false);

  const { width } = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(width > 991);

  useEffect(() => {
    setIsDesktop(width > 991);
  }, [width]);

  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  if (!isDesktop) {
    return (
      <DropdownWrapper
        data={data}
        label={label}
        onSearch={(e) => {
          onSearch(e);
          closeModal();
        }}
        setOpen={setOpen}
        icon={Icon}
        name={name}
      />
    );
  }

  return (
    <Outest ref={ref}>
      <Outer
        onClick={() => {
          setOpen(!open);
        }}
      >
        {Icon}
        <p>{name}</p>
        <BiChevronDown size={16} />
      </Outer>
      {open && (
        <DropdownWrapper
          data={data}
          label={label}
          onSearch={onSearch}
          setOpen={setOpen}
          icon={Icon}
          name={name}
        />
      )}
    </Outest>
  );
};

export default Dropdown;

const MobTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${theme.colors.mainBlack};
  font-size: 16px;
  font-weight: 600;
`;

const DropdownWrapper = ({
  data,
  label,
  onSearch,
  setOpen,
  name,
  icon: Icon,
}) => {
  const [order, setOrder] = useState("asc");
  const [filter, setFilter] = useState(data[0]?.value); // [{value, name}]
  const [values, setValues] = useState({});

  return (
    <DropdownOuter>
      <OrderContainer>
        <MobTitle>
          {Icon}
          <p>{name}</p>
        </MobTitle>
        <Checkbox
          id={`${name}-asc`}
          checked={order === "asc"}
          onChange={() => {
            setOrder("asc");
          }}
        >
          Ascending
        </Checkbox>
        <Checkbox
          id={`${name}-desc`}
          checked={order === "desc"}
          onChange={() => {
            setOrder("desc");
          }}
        >
          Descending
        </Checkbox>
      </OrderContainer>
      {!!data && data?.length > 0 && (
        <DataContainer>
          {data.map(({ value, name }) => (
            <Checkbox
              key={value}
              checked={filter === value}
              onChange={() => {
                setFilter(value);
              }}
            >
              {name}
            </Checkbox>
          ))}
        </DataContainer>
      )}
      <EqualsInput
        id={`${name}-equals`}
        label={label}
        onChange={({ value, symbolValue, symbol }) => {
          setValues({ value, symbolValue, symbol });
        }}
      />
      <SearchBtn
        onClick={() => {
          if (!values?.value) {
            document.getElementById(`${name}-equals`).classList.add("animate");
            return;
          }
          onSearch({
            order,
            filter,
            values,
          });
          setOpen(false);
        }}
      >
        Search
      </SearchBtn>
    </DropdownOuter>
  );
};
