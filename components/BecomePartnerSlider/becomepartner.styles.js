import styled from "styled-components";
import { device } from "../../styles/device";

const BecomePartner = styled.div`
  background: ${({ theme }) => theme.colors.mainWhite};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.11);
  border-radius: 5px;
  padding: 17px 22px;
  margin-bottom: 25px;
  align-items: center;
  .close-become {
    position: absolute;
    right: 0;
    top: 0;
    padding: 2px;
    background: transparent;
    border: 0px;
  }
  .close-become:hover,
  .close-become:focus {
    background: rgba(103, 123, 122, 0.2);
  }
  @media ${device.mobile} {
    display: block !important;
  }
`;
const BecomePartnerLeft = styled.div`
  span {
    display: inline-block;
    vertical-align: middle;
  }
  @media ${device.mobile} {
    display: flex;
    align-items: center;
    img {
      width: 30px;
    }
    .pr-15 {
      padding-right: 10px;
    }
    &.slick-slide img {
      width: 35px;
    }
  }
`;
const BecomePartnerText = styled.div`
  display: inline-block;
  vertical-align: middle;

  label {
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    display: inline-block;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.secondaryBlack};
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: ${({ theme }) => theme.colors.secondaryBlack};
    margin: 0px;
  }
  span {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
  @media ${device.mobile} {
    label {
      font-size: 16px;
    }
  }
`;
const BecomePartnerRight = styled.div`
  margin-left: auto;
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
export {
  BecomePartner,
  BecomePartnerLeft,
  BecomePartnerText,
  BecomePartnerRight,
};
