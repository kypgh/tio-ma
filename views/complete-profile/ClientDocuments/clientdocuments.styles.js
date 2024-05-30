import styled from "styled-components";
import { device } from "../../../styles/device";
import { theme } from "../../../styles/theme";

const ClientDocuments = styled.section`
  width: 100%;
  padding: 0 25px;
  @media ${device.tablet} {
    padding: 0;
    h1 {
      margin-top: 10px;
    }
    p {
      font-size: 18px;
      line-height: 22px;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0px;
      }
    }
  }
  @media ${device.mobile} {
    padding: 0;
    h1 {
      margin-top: 0px;
    }
    p {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 18px;
    }
  }
`;
const YourProofID = styled.div`
  text-align: left;
  @media ${device.tablet} {
    h3 {
      margin-top: 10px;
    }
  }
`;
const ListUL = styled.ul`
  margin: 0px;
  color: ${({ theme }) => theme.colors.secondaryBlack};
  padding-left: 40px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  @media ${device.tablet} {
    padding-left: 30px;
  }
  @media ${device.mobile} {
    padding-left: 20px;
    font-size: 16px;
    line-height: 20px;
  }
`;
const ListItem = styled.li``;
const ProofId = styled.div`
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: 280px;
  & img {
    object-fit: contain;
    aspect-ratio: auto;
  }
`;
const Span = styled.span`
  color: ${({ theme }) => theme.colors.secondaryRed};
  padding-left: ${({ spl }) => (spl ? spl : "0px")};
  padding-right: ${({ spr }) => (spr ? spr : "0px")};
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
`;

const ParaTextContainer = styled.div`
  padding-left: 22px;
  @media ${device.tablet} {
    padding-left: 15px;
  }
  @media ${device.mobile} {
    padding-left: 0px;
  }
`;
const ParaMain = styled.div`
  font-size: 12px;
  margin-top: 10px;
  font-style: italic;
  font-weight: 800;
`;
const NoteSec = styled.div`
  margin-bottom: 20px;
  @media ${device.tablet} {
    padding-bottom: 30px;
    h4 {
      margin-top: 25px;
    }
  }
  @media ${device.mobile} {
    padding-left: 0;
    h4 {
      margin-top: 25px;
    }
  }
`;
const ProofIdentity = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media ${device.tablet} {
    h5 {
      margin-top: 30px;
    }
  }
`;
const MultipleUploadSec = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;
export {
  ClientDocuments,
  YourProofID,
  ProofId,
  ListUL,
  ListItem,
  Span,
  ParaTextContainer,
  ParaMain,
  NoteSec,
  ProofIdentity,
  MultipleUploadSec,
};
