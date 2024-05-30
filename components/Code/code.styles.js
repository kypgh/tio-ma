import styled from "styled-components";
import { device } from "../../styles/device";
import { theme } from "../../styles/theme";

export const Inputcode = styled.input`
  width: 35px;
  padding: 5px 8px;
  border-radius: 5px;
  margin-right: 15px;
  font-size: 22px;
  text-align: center;
  border: 1px solid
    ${({ bodercolor }) =>
      bodercolor ? bodercolor : theme.colors.secondaryBlack};
  &:last-child {
    margin-right: 0px;
  }
  &:focus {
    outline: none;
  }
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.colors.secondaryColor};
  }
  @media ${device.mobile} {
    width: 100%;
    margin-bottom: 10px;
  }
`;
