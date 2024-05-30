import BecomePartnerSlide from "../../components/BecomePartnerSlider";
import { TitleH3 } from "../../components/Typography";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import { DownloadMainSec } from "./download-center.styles";
import { theme } from "../../styles/theme";
import Downloadcards from "../../components/DownloadCard";
import styled from "styled-components";
import images from "../../config/images";

const DownloadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export default function DownloadCenter({ pageTranslations }) {
  const {
    cAndroid,
    cIos,
    cWeb,
    cWindows,
    download,
    launch,
    downloadTitle,
    downloadMt4Title,
    downloadMt5Title,
    downloadTioSignalsTitle,
    mt4Windows,
    mt4Mac,
    mt4Android,
    mt4Ios,
    mt4Web,
    mt5Windows,
    mt5Mac,
    mt5Ios,
    mt5Android,
    mt5Web,
    tioSignalsAndroid,
    tioSignalsApple,
  } = pageTranslations;

  const download_mt4 = [
    {
      dsrc: images.downloadMt4Windows.src,
      dalt: images.downloadMt4Windows.alt,
      dtitle: mt4Windows,
      durl: "/downloads/windows/tiomarkets4setup.exe",
      dbtntext: download,
    },
    {
      dsrc: images.downloadMt4Android.src,
      dalt: images.downloadMt4Android.alt,
      dtitle: mt4Android,
      durl: "https://play.google.com/store/apps/details?id=net.metaquotes.metatrader4&hl=en",
      dbtntext: download,
    },
    {
      dsrc: images.downloadMt4Ios.src,
      dalt: images.downloadMt4Ios.alt,
      dtitle: mt4Ios,
      durl: "https://apps.apple.com/app/metatrader-4-currency-market/id496212596",
      dbtntext: download,
    },
    {
      dsrc: images.downloadMt4Web.src,
      dalt: images.downloadMt4Web.alt,
      dtitle: mt4Web,
      durl: "https://metatraderweb.app/trade?servers=TIOMarkets-Live-4,TIOMarkets-Practice&trade_server=TIOMarkets-Live-4&lang=en&save_password=off",
      dbtntext: "Open",
    },
  ];

  const download_mt5 = [
    {
      dsrc: images.downloadMt5Windows.src,
      dalt: images.downloadMt5Windows.alt,
      dtitle: mt5Windows,
      durl: "/downloads/windows/tiomarkets5setup.exe",
      dbtntext: download,
    },
    {
      dsrc: images.downloadMt5Mac.src,
      dalt: images.downloadMt5Mac.alt,
      dtitle: mt5Mac,
      durl: "/downloads/mac/instructions_mt5.zip",
      dbtntext: download,
    },
    {
      dsrc: images.downloadMt5Mac.src,
      dalt: images.downloadMt5Mac.alt,
      dtitle: mt5Ios,
      durl: "https://apps.apple.com/app/metatrader-5-forex-stocks/id413251709",
      dbtntext: download,
    },
    {
      dsrc: images.downloadMt5Android.src,
      dalt: images.downloadMt5Android.alt,
      dtitle: mt5Android,
      durl: "https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en&referrer=ref_id%3d5218534759822904190%26server%3dTIOMarkets-Demo1%252cTIOMarkets-Live1",
      dbtntext: download,
    },
    {
      dsrc: images.downloadMt5Web.src,
      dalt: images.downloadMt5Web.alt,
      dtitle: mt5Web,
      durl: "https://metatraderweb.app/trade?servers=TIOMarkets-Live1,TIOMarkets-Demo1&trade_server=TIOMarkets-Live1&lang=en&save_password=off",
      dbtntext: "Open",
    },
  ];

  const tio_signals = [
    {
      dsrc: images.downloadTioSignalsAndroid.src,
      dalt: images.downloadTioSignalsAndroid.alt,
      dtitle: tioSignalsAndroid,
      durl: "https://play.google.com/store/apps/details?id=com.tiosignals.app&hl=en",
      dbtntext: download,
    },
    {
      dsrc: images.downloadTioSignalsIos.src,
      dalt: images.downloadTioSignalsIos.alt,
      dtitle: tioSignalsApple,
      durl: "https://apps.apple.com/us/app/tiosignals-fx-trading-alerts/id1564062378",
      dbtntext: download,
    },
  ];

  const download_Ctrader = [
    {
      dsrc: images.downloadcTraderWeb.src,
      dalt: images.downloadcTraderWeb.alt,
      dtitle: cWeb,
      durl: "https://app.tiomarkets.com/",
      dbtntext: launch,
    },
    {
      dsrc: images.downloadcTraderWindows.src,
      dalt: images.downloadcTraderWindows.alt,
      dtitle: cWindows,
      durl: "https://getctrader.com/tiomarkets/ctrader-tiomarkets-setup.exe",
      dbtntext: download,
    },
    {
      dsrc: images.downloadcTraderAndroid.src,
      dalt: images.downloadcTraderAndroid.alt,
      dtitle: cAndroid,
      durl: "https://play.google.com/store/apps/details?id=com.spotware.ct&hl=en_US&pli=1",
      dbtntext: download,
    },
    {
      dsrc: images.downloadcTraderIos.src,
      dalt: images.downloadcTraderIos.alt,
      dtitle: cIos,
      durl: "https://apps.apple.com/gh/app/spotware-ctrader/id767428811",
      dbtntext: download,
    },
  ];

  return (
    <>
      <RightContainer>
        <Mcontainer pall={"15px 20px"} hideRefetch>
          {/* <DownloadMainSec pall={"23px 0px 35px 0px"}>
            <TitleH3
              mt={"0px"}
              mb={"20px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
              fweight={"500"}
            >
              {downloadTitle}
            </TitleH3>
            <DownloadContainer>
              {download_Ctrader.map((opt, index) => (
                <Downloadcards
                  key={index}
                  dsrc={opt.dsrc}
                  dalt={opt.dalt}
                  dtitle={opt.dtitle}
                  durl={opt.durl}
                  dbtntext={opt.dbtntext}
                />
              ))}
            </DownloadContainer>
          </DownloadMainSec> */}

          <DownloadMainSec pall={"23px 0px 35px 0px"}>
            <TitleH3
              mt={"0px"}
              mb={"20px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
              fweight={"500"}
            >
              {downloadMt4Title}
            </TitleH3>
            <DownloadContainer>
              {download_mt4.map((opt, index) => (
                <Downloadcards
                  key={index}
                  dsrc={opt.dsrc}
                  dalt={opt.dalt}
                  dtitle={opt.dtitle}
                  durl={opt.durl}
                  dbtntext={opt.dbtntext}
                />
              ))}
            </DownloadContainer>
          </DownloadMainSec>
          <DownloadMainSec pall={"23px 0px 35px 0px"}>
            <TitleH3
              mt={"0px"}
              mb={"20px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
              fweight={"500"}
            >
              {downloadMt5Title}
            </TitleH3>
            <DownloadContainer>
              {download_mt5.map((opt, index) => (
                <Downloadcards
                  key={index}
                  dsrc={opt.dsrc}
                  dalt={opt.dalt}
                  dtitle={opt.dtitle}
                  durl={opt.durl}
                  dbtntext={opt.dbtntext}
                />
              ))}
            </DownloadContainer>
          </DownloadMainSec>
          <DownloadMainSec pall={"23px 0px 35px 0px"}>
            <TitleH3
              mt={"0px"}
              mb={"20px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
              fweight={"500"}
            >
              {downloadTitle}
            </TitleH3>
            <DownloadContainer>
              {download_Ctrader.map((opt, index) => (
                <Downloadcards
                  key={index}
                  dsrc={opt.dsrc}
                  dalt={opt.dalt}
                  dtitle={opt.dtitle}
                  durl={opt.durl}
                  dbtntext={opt.dbtntext}
                />
              ))}
            </DownloadContainer>
          </DownloadMainSec>
          <DownloadMainSec pall={"23px 0px 35px 0px"}>
            <TitleH3
              mt={"0px"}
              mb={"20px"}
              size={"20px"}
              lheight={"24px"}
              txtcolor={theme.colors.secondaryDarkGray}
              fweight={"500"}
            >
              {downloadTioSignalsTitle}
            </TitleH3>
            <DownloadContainer>
              {tio_signals.map((opt, index) => (
                <Downloadcards
                  key={index}
                  dsrc={opt.dsrc}
                  dalt={opt.dalt}
                  dtitle={opt.dtitle}
                  durl={opt.durl}
                  dbtntext={opt.dbtntext}
                />
              ))}
            </DownloadContainer>
          </DownloadMainSec>
        </Mcontainer>
      </RightContainer>
    </>
  );
}
