import styled from "styled-components";

export const Bordersec = styled.div`
  border-bottom: ${({ borbt }) => (borbt ? borbt : `0px`)};
  border-top: ${({ bortop }) => (bortop ? bortop : `0px`)};
  margin-top: ${({ mt }) => (mt ? mt : "")};
  margin-bottom: ${({ mb }) => (mb ? mb : "")};
  margin: ${({ marall }) => (marall ? marall : "")};
`;
