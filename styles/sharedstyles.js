import styled from "styled-components";
import { device } from "./device";
import { theme } from "./theme";

const Container = styled.div`
  /* max-width: 1140px; */
  margin: auto;
  padding: 0px 15px;
  display: flex;

  @media ${device.mobile} {
    padding: 0px 5px;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 485px;
  width: 100%;
  margin-top: 94px;
  margin-bottom: 75px;

  @media ${device.tablet} {
    margin-top: 30px;
    margin-bottom: 0px;
  }
`;

const LoginMainContainer = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  width: 500px;
  background: ${({ theme }) => theme.colors.mainWhite};
  /* color: ${({ theme }) => theme.colors.mainWhite}; */
  padding: 35px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.13);
  border-radius: 5px;

  @media ${device.tablet} {
    width: 100%;
    padding: 35px;
  }

  @media ${device.mobile} {
    width: 100%;
    padding: 20px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
  width: 100%;
  margin-bottom: 0px;

  @media ${device.mobile} {
    margin-bottom: 0px;
  }
`;

const ButtonContainer = styled.div`
  margin: 30px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${device.tablet} {
    margin: 15px 0;
  }
  @media ${device.mobile} {
    margin: 15px 0;
  }
`;

const Codecontainer = styled.div`
  margin-top: 0px;
  margin-bottom: 80px;
`;

// TODO: maybe change all this
const EditActionDropdown = styled.div`
  background: ${({ theme }) => theme.colors.mainWhite};
  border: none;
  right: 16px;
  top: 0px;
  margin: 0;
  min-width: 175px;
  padding: 16px;
  position: absolute;
  box-shadow: 0px 0px 8px 3px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  z-index: 1;
  & ul {
    padding-left: 0px;
    margin: 0px;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
  }
  & li {
    list-style-type: none;
    margin-bottom: 10px;
    width: 100%;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */

    color: ${({ theme }) => theme.colors.darkGrayishBlue};
    :last-child {
      margin-bottom: 0px;
    }
  }
  & li img {
    display: inline-block;
    vertical-align: middle;
  }
`;

const McontainerSC = styled.div`
  background: ${({ bgcolor }) => (bgcolor ? bgcolor : theme.colors.mainWhite)};
  box-shadow: ${({ bxshadow }) => (bxshadow ? bxshadow : "")};
  border-radius: ${({ bradius }) => (bradius ? bradius : "5px")};
  padding: ${({ pall }) => (pall ? pall : "10px 25px")};
  align-items: ${({ align }) => (align ? align : "")};
  position: relative;

  margin-bottom: ${({ mb }) => (mb ? mb : "")};
  /* min-height: ${({ minh }) => (minh ? minh : "")}; */
  min-height: 720px;

  @media ${device.tablet} {
    margin-bottom: ${({ mbTabletL }) => (mbTabletL ? mbTabletL : "")};
    /* min-height: ${({ minhTabletL }) => (minhTabletL ? minhTabletL : "")}; */
  }

  @media ${device.mobile} {
    padding: 5px 10px;
  }
`;

const Dinputct = styled.div`
  text-align: left;
  margin-top: ${({ mt }) => (mt ? mt : "0px")};
  margin-bottom: ${({ imb }) => (imb ? imb : "0px")};
  display: flex;
  width: 100%;

  label {
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }

  @media ${device.tablet} {
    margin-top: 0;
    margin-bottom: 0px;
    display: block;
    gap: 0px;
    width: 100%;

    &.mb-80 {
      margin-bottom: 40px;
    }
  }
`;

//prettier-ignore
const Dflex = styled.div.attrs((props) => ({ align: props.align || "center", justify: props.justify || "center", column: props.column || false, }))`
  /* position: relative; */
  display: flex;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  max-width: 100%;
`;

export {
  Dflex,
  Container,
  RightContainer,
  MainContainer,
  ButtonContainer,
  InputContainer,
  LoginMainContainer,
  Codecontainer,
  EditActionDropdown,
  Dinputct,
};
