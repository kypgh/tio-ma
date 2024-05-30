import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";
import { default as React, useEffect, useRef, useState } from "react";
import { Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";
import { LangListMenu } from "./lang.styles";
import { SVGFlag } from "../../../components/Flags/dist";
import { languagesList, localeToFlagMap } from "../../../config/languageConfig";

const FlagContainer = styled.div`
  /* border-radius: 7px; */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: max-content;
  height: max-content;

  & img {
    height: 16px;
  } */
  width: 28px;
  height: 21px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.58);
`;

const SHpan = styled.span`
  width: min-content;
  min-width: 50px;
`;

export default function Lang() {
  const [showLang, setShowLang] = useState(false);
  const handleLang = () => setShowLang(!showLang);

  const router = useRouter();
  const { locale } = router;

  const umenuRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (umenuRef.current && !umenuRef.current.contains(event.target)) {
      setShowLang(false);
    }
  };

  return (
    <>
      <Dflex
        ref={umenuRef}
        onClick={handleLang}
        id="dropdownMenuLink"
        style={{
          cursor: "pointer",
          color: theme.colors.mainWhite,
          fontSize: "14px",
          gap: "5px",
        }}
      >
        <FlagContainer
          style={{
            borderRadius: "50%",
            width: "22px",
          }}
        >
          <SVGFlag country={localeToFlagMap[locale]} flagWidth="40" />
        </FlagContainer>
        <span>
          {languagesList.find((el) => el.value === locale).value.toUpperCase()}
        </span>
      </Dflex>

      {showLang && (
        <Dflex
          style={{
            display: "contents",
          }}
        >
          <LangListMenu>
            <ul aria-labelledby="dropdownMenuLink">
              {languagesList.map((flags, index) => (
                <li
                  key={index}
                  value={flags.label}
                  onClick={() => {
                    setShowLang(false);
                  }}
                >
                  <Link
                    href={{
                      pathname: router.pathname,
                    }}
                    locale={flags.value}
                  >
                    <Dflex style={{ gap: "5px" }} justify="flex-start">
                      <FlagContainer>
                        <SVGFlag
                          country={localeToFlagMap[flags.value]}
                          flagWidth="40"
                        />
                      </FlagContainer>

                      <SHpan>{flags.label}</SHpan>
                    </Dflex>
                  </Link>
                </li>
              ))}
            </ul>
          </LangListMenu>
        </Dflex>
      )}
    </>
  );
}
