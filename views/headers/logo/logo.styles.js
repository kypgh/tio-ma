import styled from "styled-components";
const LogoMobile = styled.div`
  @media only screen and (min-width: 768px) {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;
const LogoDesktop = styled.div`
  @media only screen and (min-width: 768px) {
    display: block;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
export { LogoMobile, LogoDesktop };
