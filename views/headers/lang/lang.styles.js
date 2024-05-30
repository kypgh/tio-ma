import styled from "styled-components";
import { device } from "../../../styles/device";

const LangListMenu = styled.div`
  background: ${({ theme }) => theme.colors.mainBlack};
  border: none;
  right: 0;
  top: 61px;
  margin: 0;
  max-width: 255px;
  width: 100%;
  padding: 17px 22px;
  position: absolute;
  border-radius: 0px 0px 5px 5px;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  & ul {
    padding-left: 0px;
    margin: 0px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -15px;
  }
  & li {
    list-style-type: none;
    margin-bottom: 20px;
    min-width: 100px;
  }
  & a {
    color: ${({ theme }) => theme.colors.mainWhite};
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
  }
  @media ${device.tablet} {
    max-width: 400px;
    & li {
      width: 33%;
    }
  }
  @media ${device.mobile} {
    max-width: 270px;
    & li {
      width: 50%;
      margin-bottom: 15px;
    }
  }
`;

export { LangListMenu };
