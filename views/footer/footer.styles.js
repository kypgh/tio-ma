import styled from "styled-components";
import { device } from "../../styles/device";
const Footer = styled.footer`
  max-width: 1440px;
  width: 100%;
  padding-top: 45px;
  & ul {
    margin: 0;
    padding: 0;
    display: block;
  }
  & ul li {
    padding-right: 30px;
    list-style: none;
    color: ${({ theme }) => theme.colors.secondaryBlack};
    font-size: 12px;
    line-height: 24px;
    padding-bottom: 0px;
    padding-left: 0px;
    font-weight: 400;
    display: inline-block;
  }

  & ul li a {
    color: ${({ theme }) => theme.colors.secondaryBlack};
    text-decoration: underline;
  }

  & ul li a:hove {
    color: ${({ theme }) => theme.colors.darkGray};
    text-decoration: none;
  }
  @media ${device.mobile} {
    & ul {
      width: 100%;
    }
    & ul li {
      width: 100%;
    }
  }
`;
const FooterTextNote = styled.div`
  padding-bottom: 25px;
  & p {
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 15px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
`;
const FooterManu = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding: 30px 0px;
  justify-content: center;
  display: flex;
  gap: 30px;
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media ${device.tablet} {
    padding-bottom: 80px;
    flex-wrap: wrap;
    gap: 15px;
  }
  @media ${device.mobile} {
    padding-bottom: 30px;
    & a {
      width: 100%;
    }
  }
`;
const FooterRight = styled.div`
  margin-left: auto;
  align-items: center;
  display: flex;
  z-index: 6;
  vertical-align: middle;

  & a {
    color: ${({ theme }) => theme.colors.secondaryColor};
    vertical-align: middle;
    font-size: 12px;
    line-height: 24px;
  }
  @media ${device.mobile} {
    width: 100%;
    display: block;
  }
`;

export { Footer, FooterTextNote, FooterManu, FooterRight };
