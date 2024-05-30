import { RiMenuFill, RiMenuFoldLine } from "react-icons/ri";
import styled from "styled-components";
import { Container, Dflex } from "../../styles/sharedstyles";
import { Header } from "./headers.styles";
import Lang from "./lang";
import Logo from "./logo";
import Userdrop from "./userdrop";
import { useCurrentUser } from "@/utils/hooks/queryHooks";

const IconWrapper = styled.div`
  font-size: 22px;
  cursor: pointer;
  color: #f4f4f4;
`;

const Cid = styled.div`
  color: #f4f4f4;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  & span {
    font-size: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 330px) {
    & span {
      display: none;
    }
  }
`;

export default function Headers({
  genericTranslations = {},
  isPublicPath,
  isOpen,
  onClickBurger = () => {},
  isMobile,
}) {
  const { data: user } = useCurrentUser({
    enabled: !isPublicPath,
  });

  return (
    <>
      <Header>
        <Container style={{ padding: "15px ", position: "relative" }}>
          <Dflex
            justify={"space-between"}
            style={{ width: "100%", position: "unset" }}
          >
            <Dflex style={{ gap: "10px" }}>
              <Logo />

              {isMobile && !isPublicPath && (
                <IconWrapper onClick={onClickBurger}>
                  {isOpen ? <RiMenuFoldLine /> : <RiMenuFill />}
                </IconWrapper>
              )}
            </Dflex>
            <Dflex style={{ gap: "20px", position: "unset" }}>
              {!isPublicPath && (
                <Cid>
                  <span>Client ID: </span>
                  <strong>{user?.readableId}</strong>
                </Cid>
              )}
              <Lang />
              {!isPublicPath && (
                <>
                  <Userdrop
                    genericTranslations={genericTranslations}
                    user={user}
                  />
                </>
              )}
            </Dflex>
          </Dflex>
        </Container>
      </Header>
    </>
  );
}
