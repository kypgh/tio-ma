import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import adBanners from "@/config/adBanners";
import { useSessionStorage } from "@/utils/hooks/useSessionStorage";
import { useWindowSize } from "usehooks-ts";

const SlideIn = keyframes`
  0% {
    transform: translateX(150%);
  }
  100% {
    transform: translateX(0);
  }
`;

const BannerContainer = styled.div`
  position: fixed;
  display: flex;
  bottom: 20px;
  right: 10px;
  z-index: 99;
  box-shadow: 0px 0px 16px 0px rgb(0 0 0 / 26%);
  border-radius: 8px;
  border: 1px solid rgba(17, 17, 17, 0.45);
  flex-wrap: wrap;
  transform: translateX(150%);
  animation: ${SlideIn} 0.5s ease-in-out forwards 1;
  animation-delay: 4s;
`;

const BannerCointainerInner = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  border-radius: 6px;
  max-width: 450px;
  overflow: hidden;
  & a {
    display: flex;
    width: 100%;
    flex: 1 1 auto;
    & img {
      width: 100%;
      height: 100%;
    }
  }
`;

const TopBar = styled.div`
  width: 100%;
  padding: 6px;
  background-color: #111;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const DismissBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  cursor: pointer;
  margin-right: 5px;
`;

const Title = styled.div`
  display: flex;
  color: #fff;
  font-size: 12px;
`;

const BannerPromotion = () => {
  const [randomBanner, setRandomBanner] = useState(adBanners["25bonus"]);
  const [hydrated, setHydradted] = useState(false);

  const [showBanner, setShowBanner] = useSessionStorage("showBanner", true);

  useEffect(() => {
    const allBannerKeys = Object.keys(adBanners);
    setRandomBanner(
      (_) =>
        adBanners[
          allBannerKeys[Math.floor(Math.random() * allBannerKeys.length)]
        ]
    );

    setHydradted(true);

    return () => {
      setHydradted(false);
    };
  }, []);

  const { width } = useWindowSize();

  return (
    <>
      {showBanner && width > 770 && hydrated && (
        <BannerContainer>
          <BannerCointainerInner>
            <TopBar>
              <Title>{randomBanner?.title}</Title>
              <DismissBanner
                onClick={() => {
                  setShowBanner(false);
                }}
              >
                <FaTimes color="#fff" size={16} />
              </DismissBanner>
            </TopBar>
            <Link
              onClick={() => {
                setShowBanner(false);
              }}
              href={{
                pathname: randomBanner?.link,
                query: randomBanner?.query,
              }}
              target={randomBanner?.target}
            >
              <Image
                priority={true}
                src={randomBanner?.banner?.src}
                width={450}
                height={190}
                alt="banner"
              />
            </Link>
          </BannerCointainerInner>
        </BannerContainer>
      )}
    </>
  );
};

export default BannerPromotion;
