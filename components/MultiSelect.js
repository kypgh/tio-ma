import { theme } from "@/styles/theme";
import useOnClickAway from "@/utils/hooks/useOnClickAway";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

const MultiSelectContainer = styled.div`
  position: relative;
  /* background-color: ${theme.colors.mainWhite};
  border: 1px solid ${theme.colors.silverLightGray};
  border-radius: 5px;
  padding: 5px 20px 5px 10px;

  &[data-error="true"] {
    border-color: ${theme.colors.primaryRed};
  } */
`;

const MultiSelectLabel = styled.div`
  background-color: ${theme.colors.mainWhite};
  border: 1px solid ${theme.colors.silverLightGray};
  border-radius: 5px;
  padding: 5px 20px 5px 10px;
  font-size: 0.8rem;
  position: relative;
  cursor: default;
  width: 100%;

  &[data-error="true"] {
    border-color: ${theme.colors.primaryRed};
  }

  & span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 50%;
    right: 10px;
    width: 5px;
    height: 5px;
    background-color: transparent;
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    transform: rotateZ(45deg) translateX(50%);
  }
`;

const MultiSelectOptionsOuter = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${theme.colors.mainWhite};
  border: 1px solid ${theme.colors.silverLightGray};
  z-index: 100;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  cursor: default;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${theme.colors.silverLightGray};
  }
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.grayColor};
    border-radius: 50px;
  }
`;

const MultiSelectItem = styled.div`
  padding: 2px 10px;
  font-size: 12px;
  transition: 0.1s all ease;
  pointer-events: ${({ inactive }) => inactive && "none"};
  color: ${({ inactive }) => inactive && "grey"};
  display: flex;
  align-items: center;
  justify-content: ${({ inactive }) => inactive && "space-between"};
  gap: 7px;
  position: ${({ inactive }) => inactive && "sticky"};
  top: 0;
  z-index: 1000;
  background-color: ${({ inactive }) => inactive && theme.colors.mainWhite};

  &:hover {
    background-color: ${({ inactive }) =>
      !inactive && theme.colors.primaryColor};
  }

  & span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  background-color: ${theme.colors.silverLightGray};
  border-radius: 50%;
  position: relative;

  &.active::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.colors.primaryColor};
    border-radius: 50%;
    width: 5px;
    height: 5px;
  }
`;

const InnerBtns = styled.div`
  padding: 2px 5px;
  background-color: ${theme.colors.lightGrayishBlue};
  font-size: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 5px;
  color: ${theme.colors.mainWhite};
  text-transform: capitalize;
  min-width: 50px;
  cursor: pointer;
  pointer-events: all;
  transition: 0.3s all ease;

  &:hover {
    background-color: ${theme.colors.primaryColor};
  }
`;

const MultiSelectSearch = styled.input`
  width: 100%;
  background-color: ${theme.colors.mainWhite};
  border: none;
  padding: 2px 5px;
  border-radius: 5px;
  pointer-events: all;
  color: ${theme.colors.mainBlack};
  border: 1px solid ${theme.colors.silverLightGray};

  &:focus {
    outline: none;
  }
`;

const Err = styled.div`
  color: ${theme.colors.primaryRed};
  font-size: 12px;
`;

const Outest = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const MultiSelect = ({
  options = [],
  onChange = () => {},
  value = [],
  singleSelect = false,
  error,
  name,
  label,
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef();
  const searchRef = useRef();

  const memoizedFormattedOptions = useMemo(() => {
    return options.map((option) => {
      if (typeof option === "string") {
        return { value: option, label: option, searchTerm: option };
      }
      return option;
    });
  }, [options]);

  useOnClickAway(ref, () => setOpen(false));

  const memoizedMappedElements = useMemo(() => {
    return options
      .filter((v) => value.includes(v.value))
      .map((v, index) => (
        <React.Fragment key={index}>
          {v.label}
          {index < value.length - 1 ? ", " : ""}
        </React.Fragment>
      ));
  }, [memoizedFormattedOptions, value]);

  useEffect(() => {
    if (open) {
      searchRef.current.focus();
    }
  }, [open]);

  return (
    <Outest data-error={!!error}>
      {label}
      <MultiSelectContainer ref={ref} name={name} id={id}>
        <MultiSelectLabel data-error={!!error} onClick={() => setOpen(!open)}>
          <span>
            {memoizedMappedElements}
            {value?.filter((x) => x).length === 0 && "Select"}
          </span>
        </MultiSelectLabel>
        {open && (
          <MultiSelectOptionsOuter
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setOpen(false);
              }
            }}
          >
            <MultiSelectItem inactive>
              Select
              {!singleSelect && (
                <span>
                  <InnerBtns
                    onClick={() => onChange(options.map((v) => v.value))}
                  >
                    Select All
                  </InnerBtns>
                  <InnerBtns onClick={() => onChange([])}>Clear</InnerBtns>
                </span>
              )}
            </MultiSelectItem>
            <MultiSelectItem inactive>
              <MultiSelectSearch
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                ref={searchRef}
              />
            </MultiSelectItem>
            {memoizedFormattedOptions
              .filter(
                (x) =>
                  x.value?.toLowerCase().includes(search.toLowerCase()) ||
                  x.searchTerm?.toLowerCase().includes(search.toLowerCase()) ||
                  (typeof x.label === "string" &&
                    x.label?.toLowerCase().includes(search.toLowerCase()))
              )
              .map((option, idx) => (
                <MultiSelectItem
                  key={option.value + idx}
                  onClick={() => {
                    if (singleSelect) {
                      onChange([option.value]);
                      setOpen(false);
                    } else {
                      let res;
                      if (value.includes(option.value)) {
                        res = value.filter((item) => item !== option.value);
                      } else {
                        res = [...value, option.value];
                      }
                      onChange(res);
                    }
                  }}
                >
                  {!singleSelect && (
                    <Dot
                      className={`${
                        value.includes(option.value) ? "active" : undefined
                      }`}
                    />
                  )}
                  {option.label}
                </MultiSelectItem>
              ))}
          </MultiSelectOptionsOuter>
        )}
      </MultiSelectContainer>
      {error && <Err>{error}</Err>}
    </Outest>
  );
};

// ///
