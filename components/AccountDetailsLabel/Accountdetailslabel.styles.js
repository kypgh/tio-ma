import styled from "styled-components";

const AccountDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  :last-child {
    padding-bottom: 0px;
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.secondaryBlack};
  font-size: 16px;
  line-height: 13px;
  font-style: normal;
  font-weight: 600;
`;

const SpanTxt = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 13px;
  text-align: right;
  color: ${({ theme }) => theme.colors.lightGrayishBlue};
`;

export { AccountDetail, Label, SpanTxt };
