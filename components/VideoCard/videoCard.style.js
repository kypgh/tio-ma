import styled from "styled-components";


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

export {
  VCard, CardTitle
};
