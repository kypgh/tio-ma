import styled from "styled-components";
import { device } from "../../styles/device";

const EducationalMainSec = styled.section`
  margin-bottom: 60px;
  :last-child {
    margin-bottom: 35px;
  }
`;
const EducationalContainer = styled.div`
  display: grid;
  column-gap: 77px;
  row-gap: 55px;
  grid-template-columns: auto auto auto;
  @media ${device.tablet} {
    grid-template-columns: auto auto;
    gap: 32px;
  }
  @media ${device.mobile} {
    grid-template-columns: auto;
  }
`;
const VCard = styled.div`
  transition: 0.2s all ease;
  :hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h5`
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 0px;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
`;

export { EducationalMainSec, EducationalContainer, VCard, CardTitle };
