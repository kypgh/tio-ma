import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

const Msg = styled.div`
  color: ${theme.colors.mainBlack};
  font-weight: 600;
  padding: 15px;
`;

const EmptyBoundary = ({
  isEmpty,
  isLoading,
  children,
  response = "No entries found",
}) => {
  if (!isEmpty) {
    return children;
  }
  return typeof response === "string" ? <Msg>{response}</Msg> : response;
};

export default EmptyBoundary;
