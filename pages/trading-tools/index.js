import React from "react";
import { i18n, languages } from "../../config/languageConfig";

import HeadMetaData from "../../components/HeadMetaData";
import TradingToolsView from "../../views/trading-tools/TradingToolsView";
import { METADATA_TEXTS } from "../../constants/metadata";
import youtubeService from "../../backend/services/youtube.service";

const howToPlaylistsWithLang = {
  en: "PLWprcNCq6kTUr6W3zFq-uRfVeRBBgm6AO",
  es: "PLWprcNCq6kTVUZ5KLtOpGTgD-2URntfUf",
  ar: "PLWprcNCq6kTXb3xv8irWvIbUHmPpiL5Wd",
  de: "PLWprcNCq6kTVyuBaUzTOjj_blW9qMscBB",
  it: "PLWprcNCq6kTWQDkQK-0sGwsNuPVsjCFX1",
  pl: "PLWprcNCq6kTV0j6hcJEvDCf_9ZTpO-9d4",
  pt: "PLWprcNCq6kTU9RyyKHk7HJ0cZdHOddtJ5",
  tr: "PLWprcNCq6kTWl3N8fhxKcbx0zulIB4hAM",
  th: "PLWprcNCq6kTXkgZBSzo1fuEfdnlevo2gD",
  hu: "PLWprcNCq6kTVxFzlBWyX8oW3x1evoUdTF",
  fr: "PLWprcNCq6kTVs4vFlnGTEN8ktgOzM9Zod",
  id: "PLWprcNCq6kTXBTVFHKKVchC8WBNmAiY1A",
  ms: "PLWprcNCq6kTWAYw8LkzrTAHOGAvOpW7P-",
  vi: "PLWprcNCq6kTWTqSHrxqBKyFxWP7bVrO82",
  "zh-hans": "PLWprcNCq6kTXbGLthiJAfj0dNUd7xSA4y",
  hi: "PLWprcNCq6kTW-hj9EwZ1Wy1lQ-mz4yxu1",
  el: "PLWprcNCq6kTX8UUpluuGbcm8JW-EIIFF3",
  nl: "PLWprcNCq6kTWafuEopE4BPxGiopZBvKOM",
  cz: "PLWprcNCq6kTXm0CMyhtqmtvrFMtA1CEkM",
};

const educationVideosWithLang = {
  // en: "",
  es: "PLWprcNCq6kTXHU15ciIIUwH56YbZMi8yl",
  ar: "PLWprcNCq6kTXaEApd7rc8IhsjVlyXUm_L",
  ms: "PLWprcNCq6kTVI4NlxVrV3UNKg8YvmcTsi",
  vi: "PLWprcNCq6kTVtf0Yuzpd7xTMVXjwr6CAu",
  "zh-hans": "PLWprcNCq6kTUFzKHpEDAVTqLDPESmr0wF",
  el: "PLWprcNCq6kTU1KFqF_-bw4-cKxjCNvN7c",
};

// const tutorialVideos = [
//   "s8PlLaWyDmg",
//   "DKWtWbVVVHU",
//   "wCd2bsdKwHA",
//   "Ox9Iyqg_fxM",
//   "MskR8X6EfY4",
// ];

const TradingTools = ({
  pageTranslations,
  youtubeData,
  tutorialVideosData,
}) => {
  return (
    <HeadMetaData meta={METADATA_TEXTS.tradingTools.meta}>
      <TradingToolsView
        pageTranslations={pageTranslations}
        youtubeData={youtubeData}
        tutorialVideosData={tutorialVideosData}
      />
    </HeadMetaData>
  );
};

export default TradingTools;

export async function getStaticProps(context) {
  const { locale } = context;

  const youtubeData = await youtubeService
    .getVideosFromPlaylist({
      playListId:
        howToPlaylistsWithLang[locale] ?? howToPlaylistsWithLang["en"],
    })
    .catch((err) => {
      console.log(err);
    });

  const tutorialVideosData = await youtubeService
    .getVideosFromPlaylist({
      playListId:
        educationVideosWithLang[locale] ?? educationVideosWithLang["en"],
    })
    .catch((err) => {
      console.log(err);
    });

  // const tutorialVideosData = await Promise.all(
  //   tutorialVideos.map(async (videoId) => {
  //     const obj = await youtubeService.getVideoById({ videoId });
  //     return { ...obj, id: videoId };
  //   })
  // );

  return {
    props: {
      pageTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "downloadCenterPage"),
        ...i18n(languages[locale] ?? languages["en"], "educationalVideosPage"),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
      youtubeData,
      tutorialVideosData,
    }, // will be passed to the page component as props
  };
}
