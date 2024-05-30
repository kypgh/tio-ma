import Link from "next/link";
import { BiHelpCircle } from "react-icons/bi";
import styled from "styled-components";
import aLinks from "../../../config/aLinks";
import { device } from "../../../styles/device";
import { Container, Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";
import {
  HelpAppLeft,
  HelpAppRight,
  HelpMainSec,
} from "./incompleteProfile.styles";

const NewLink = styled(Link)`
  background: #ff7a04;
  color: #ffffff;
  font-weight: 700;
  font-size: 12px;
  /* line-height: 15px; */
  border-radius: 4px;
  padding: 6px 20px;
  border: 1px solid transparent;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  opacity: 1;
  pointer-events: auto;
`;

const CusFlex = styled(Dflex)`
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  @media ${device.mobile} {
    & {
      display: block;
    }
  }
`;

export default function IncompleteProfile({
  genericTranslations,
  isKycApproved,
}) {
  const { complete, completeProf } = genericTranslations || {};

  return isKycApproved ? null : (
    <>
      <HelpMainSec>
        <Container>
          <CusFlex>
            <HelpAppLeft style={{ gap: "5px" }}>
              <BiHelpCircle
                size={22}
                color={theme.colors.primaryBlue}
                style={{ minWidth: "22px" }}
              />
              <label>{complete}</label>
            </HelpAppLeft>
            <HelpAppRight>
              <NewLink href={aLinks.completeProfile}>{completeProf}</NewLink>
            </HelpAppRight>
          </CusFlex>
        </Container>
      </HelpMainSec>
    </>
  );
}
