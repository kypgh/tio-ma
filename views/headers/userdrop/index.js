import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import styled from "styled-components";
import Alink from "../../../components/Alink";
import Loader from "../../../components/Loader";
import aLinks from "../../../config/aLinks";
import { Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";
import agent from "../../../utils/agent";
import {
  EMailLabel,
  LogOutSec,
  SettingsSec,
  UserMenu,
  UserPhotos,
  CopyBtn,
} from "./userdrop.styles";
import { useNotification } from "../../../components/actionNotification/NotificationProvider";
import useUserFlags from "@/utils/hooks/useUserFlags";

const SuperLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileIconOuter = styled.div`
  border-radius: 50%;
  background-color: ${theme.colors.darkGray};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
`;

export default function Userdrop({ genericTranslations, user = {} }) {
  const [showUser, setShowUser] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const { isShariaEnabled } = useUserFlags();

  const { navSettings, profile, signOut } = genericTranslations;

  const handleUser = () => setShowUser(!showUser);

  const StyledLink = ({ href, name }) => (
    <div
      style={{ width: "100%" }}
      onClick={() => {
        setShowUser(false);
      }}
    >
      <Alink
        href={href}
        name={name}
        style={{ width: "100%", display: "block" }}
      />
    </div>
  );

  const menuRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowUser(false);
    }
  };

  const router = useRouter();
  const actionNotification = useNotification();

  const copyClientID = (id) => {
    navigator.clipboard.writeText(id);
    actionNotification.SUCCESS("Copied Client ID to clipboard");
  };

  return (
    <>
      {isLogoutLoading && (
        <SuperLoader>
          <Loader isLoading={isLogoutLoading} />
        </SuperLoader>
      )}
      <div ref={menuRef}>
        <Dflex onClick={handleUser} style={{ cursor: "pointer" }}>
          <FaUserTie color={theme.colors.mainWhite} size={16} />
        </Dflex>
        {showUser && (
          <Dflex>
            <UserMenu>
              <UserPhotos>
                <ProfileIconOuter>
                  <FaUserTie color={theme.colors.mainWhite} size={20} />
                </ProfileIconOuter>
                {isShariaEnabled && (
                  <EMailLabel>
                    <strong>Sharia Enabled</strong>
                  </EMailLabel>
                )}
                <EMailLabel>
                  Client ID: <strong>{user.readableId}</strong>
                  <CopyBtn
                    onClick={() => {
                      copyClientID(user.readableId);
                    }}
                  >
                    <BiCopy />
                  </CopyBtn>
                </EMailLabel>
                <EMailLabel>{`${user.first_name} ${user.last_name}`}</EMailLabel>
                <EMailLabel>{user.email}</EMailLabel>
              </UserPhotos>
              <SettingsSec>
                <StyledLink href={aLinks.settings} name={navSettings} />
              </SettingsSec>
              <SettingsSec>
                <StyledLink href={aLinks.completeProfile} name={profile} />
              </SettingsSec>
              <LogOutSec>
                <span
                  style={{ cursor: "pointer", width: "100%", display: "block" }}
                  onClick={async () => {
                    setIsLogoutLoading(true);
                    return agent()
                      .logOutUser({ accessToken: getCookie("token") })
                      .catch(() => setIsLogoutLoading(false))
                      .finally(() => {
                        router.reload();
                      });
                  }}
                >
                  {signOut}
                </span>
              </LogOutSec>
            </UserMenu>
          </Dflex>
        )}
      </div>
    </>
  );
}
