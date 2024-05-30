import styled from "styled-components";
import { device } from "../../../styles/device";
import { theme } from "../../../styles/theme";

const HelpMainSec = styled.div`
  padding: 10px;
  padding-top: 0;
`;
const HelpAppLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.mainBlack};
  font-size: 14px;
`;
const HelpAppRight = styled.div`
  /* margin-left: auto; */
  align-items: center;
  display: flex;
  position: relative;
  vertical-align: middle;
  @media ${device.mobile} {
    display: block;
    text-align: center;
    margin-top: 10px;
  }
`;

export { HelpAppLeft, HelpMainSec, HelpAppRight };
