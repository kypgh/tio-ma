import React, { useState } from "react";
import ModalVideo from "react-modal-video";
import BecomePartnerSlider from "../../components/BecomePartnerSlider";
import { TitleH3 } from "../../components/Typography";
import Videocard from "../../components/VideoCard";
import "../../node_modules/react-modal-video/css/modal-video.css";
import { RightContainer } from "../../styles/sharedstyles";
import { theme } from "../../styles/theme";
import {
  EducationalContainer,
  EducationalMainSec,
} from "./educational-videos.styles";
import Border from "../../components/BorderSec";
import images from "../../config/images";
import Mcontainer from "../../components/Mcontainer";

export default function EducationalVideos({ pageTranslations }) {
  const [isOpen, setOpen] = useState(false);
  const [modelState, setModelState] = useState();

  const {
    openYourAccountTitle,
    tradingVideosTitle,
    webinarsTitle,
    openAccountOneStep,
    openAccountDocumentUpload,
    openAccountFundMyaccount,
    openAccountMt4Login,
    openAccountTradingAccount,
    tradingFxWhyShould,
    tradingCfds,
    tradingOilandGold,
    tradingTradeBrands,
    tradingFirstTrade,
    tradingLeverage,
    tradingFundamental,
    tradingStrategy,
    tradingForexSpreads,
    tradingNfpForex,
    tradingInterestRates,
    tradingForexPsychology,
    tradingBeSafe,
    tradingTechnicalAnalysis,
    webinarsManagingRisk,
    webinarsFirstTradesMt4,
    webinarsToolsToManage,
  } = pageTranslations;

  const openAccountVideos = [
    {
      src: images.videosOpenAccount.src,
      alt: images.videosOpenAccount.alt,
      title: openAccountOneStep,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosDocumentUpload.src,
      alt: images.videosDocumentUpload.alt,
      title: openAccountDocumentUpload,
      vid: "DKWtWbVVVHU",
    },
    {
      src: images.videosFundMyAccount.src,
      alt: images.videosFundMyAccount.alt,
      title: openAccountFundMyaccount,
      vid: "wCd2bsdKwHA",
    },
    {
      src: images.videosMt4Login.src,
      alt: images.videosMt4Login.alt,
      title: openAccountMt4Login,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTradingAccount.src,
      alt: images.videosTradingAccount.alt,
      title: openAccountTradingAccount,
      vid: "MskR8X6EfY4",
    },
  ];

  const tradingVideos = [
    {
      src: images.videosTrading1.src,
      alt: images.videosTrading1.alt,
      title: tradingFxWhyShould,
      vid: "fI0YsVFWNX4",
    },
    {
      src: images.videosTrading2.src,
      alt: images.videosTrading2.alt,
      title: tradingCfds,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading3.src,
      alt: images.videosTrading3.alt,
      title: tradingOilandGold,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading4.src,
      alt: images.videosTrading4.alt,
      title: tradingTradeBrands,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading5.src,
      alt: images.videosTrading5.alt,
      title: tradingFirstTrade,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading6.src,
      alt: images.videosTrading6.alt,
      title: tradingLeverage,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading7.src,
      alt: images.videosTrading7.alt,
      title: tradingFundamental,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading8.src,
      alt: images.videosTrading8.alt,
      title: tradingStrategy,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading9.src,
      alt: images.videosTrading9.alt,
      title: tradingForexSpreads,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading10.src,
      alt: images.videosTrading10.alt,
      title: tradingNfpForex,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading11.src,
      alt: images.videosTrading11.alt,
      title: tradingInterestRates,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading12.src,
      alt: images.videosTrading12.alt,
      title: tradingForexPsychology,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading13.src,
      alt: images.videosTrading13.alt,
      title: tradingBeSafe,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosTrading14.src,
      alt: images.videosTrading14.alt,
      title: tradingTechnicalAnalysis,
      vid: "s8PlLaWyDmg",
    },
  ];

  const webinarsVideos = [
    {
      src: images.videosWebinars1.src,
      alt: images.videosWebinars1.alt,
      title: webinarsManagingRisk,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosWebinars2.src,
      alt: images.videosWebinars2.alt,
      title: webinarsFirstTradesMt4,
      vid: "s8PlLaWyDmg",
    },
    {
      src: images.videosWebinars3.src,
      alt: images.videosWebinars3.alt,
      title: webinarsToolsToManage,
      vid: "s8PlLaWyDmg",
    },
  ];

  return (
    <>
      <RightContainer>
        {/* <BecomePartnerSlider /> */}
        <Mcontainer pall={"30px 35px"} hideRefetch>
          <EducationalMainSec>
            <TitleH3
              mt={"0px"}
              mb={"0px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
            >
              {openYourAccountTitle}
            </TitleH3>
            <Border
              borbt={`1px solid ${theme.colors.secondaryWhite}`}
              mt={"10px"}
              mb={"25px"}
            />
            <EducationalContainer>
              {openAccountVideos.map((opt, index) => (
                <Videocard
                  key={index}
                  vstate={setOpen}
                  mState={setModelState}
                  vid={opt.vid}
                  vsrc={opt.src}
                  valt={opt.alt}
                  vtitle={opt.title}
                />
              ))}
            </EducationalContainer>
          </EducationalMainSec>
          <EducationalMainSec>
            <TitleH3
              mt={"0px"}
              mb={"0px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
            >
              {tradingVideosTitle}
            </TitleH3>
            <Border
              borbt={`1px solid ${theme.colors.secondaryWhite}`}
              mt={"10px"}
              mb={"25px"}
            />
            <EducationalContainer>
              {tradingVideos.map((opt, index) => (
                <Videocard
                  key={index}
                  vstate={setOpen}
                  mState={setModelState}
                  vid={opt.vid}
                  vsrc={opt.src}
                  valt={opt.alt}
                  vtitle={opt.title}
                />
              ))}
            </EducationalContainer>
          </EducationalMainSec>
          <EducationalMainSec>
            <TitleH3
              mt={"0px"}
              mb={"0px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
            >
              {webinarsTitle}
            </TitleH3>
            <Border
              borbt={`1px solid ${theme.colors.secondaryWhite}`}
              mt={"10px"}
              mb={"25px"}
            />
            <EducationalContainer>
              {webinarsVideos.map((opt, index) => (
                <Videocard
                  key={index}
                  vstate={setOpen}
                  mState={setModelState}
                  vid={opt.vid}
                  vsrc={opt.src}
                  valt={opt.alt}
                  vtitle={opt.title}
                />
              ))}
            </EducationalContainer>
          </EducationalMainSec>

          <ModalVideo
            channel="youtube"
            youtube={{
              autoplay: 1,
              mute: 1,
            }}
            isOpen={isOpen}
            videoId={modelState}
            onClose={() => setOpen(false)}
          />
        </Mcontainer>
      </RightContainer>
    </>
  );
}
