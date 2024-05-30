import styled from "styled-components";
import { device } from "../../styles/device";

const DCard = styled.div`
  max-width: 190px;
  width: 100%;
  text-align: center;
  display: block;
`;

const CardTitle = styled.h6`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  padding: 0 20px;
  margin: 0px;
  min-height: 34px;
`;

export { DCard, CardTitle };
