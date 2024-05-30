import React, { useRef } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { theme } from "@/styles/theme";

const Outer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  padding: 5px;
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  color: #777777;
  background-color: ${theme.colors.mainWhite};
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
`;

/**
 *
 * @typedef {Object} FormInputProps
 * @property { (e) => {} } onSearch
 * @param {React.InputHTMLAttributes<HTMLInputElement> & FormInputProps} param0
 */
const SearchInput = ({ onSearch, ...props }) => {
  const ref = useRef(null);
  return (
    <Outer>
      <AiOutlineSearch
        size={16}
        onClick={() => {
          onSearch({ target: ref.current });
        }}
      />
      <Input
        ref={ref}
        placeholder="Search"
        {...props}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSearch(e);
          }
        }}
      />
    </Outer>
  );
};

export default SearchInput;
