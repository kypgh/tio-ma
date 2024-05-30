import React from "react";
import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import { i18n, languages } from "../../config/languageConfig";
import CopyTradingView from "../../views/copy-trading/CopyTradingView";
import mt5RatingsService from "@/backend/services/mt5ratings.service";

const index = ({
  genericTranslations,
  rankData,
  returnData,
  sharpeData,
  balanceData,
}) => {
  return (
    <HeadMetaData meta={METADATA_TEXTS["copyTrading"].meta}>
      <CopyTradingView
        rankData={rankData}
        returnData={returnData}
        sharpeData={sharpeData}
        balanceData={balanceData}
      />
    </HeadMetaData>
  );
};

export default index;

export async function getStaticProps(context) {
  const { locale } = context;

  const [
    { data: rankData },
    { data: returnData },
    { data: sharpeData },
    { data: balanceData },
  ] = await Promise.all([
    mt5RatingsService.getWidgets("rank", "asc"),
    mt5RatingsService.getWidgets("returnAllTime", "desc"),
    mt5RatingsService.getWidgets("sharpeRatio", "desc"),
    mt5RatingsService.getWidgets("account/balance", "desc"),
  ]);

  return {
    props: {
      rankData: {
        ...rankData,
        items: rankData.items.filter(
          (e) => e.extension.defaultRankingPoints !== 0.0 && e.returnAllTime > 0
        ),
      },
      returnData: {
        ...returnData,
        items: returnData.items.filter(
          (e) => e.extension.defaultRankingPoints !== 0.0
        ),
      },
      sharpeData: {
        ...sharpeData,
        items: sharpeData.items.filter(
          (e) => e.extension.defaultRankingPoints !== 0.0 && e.returnAllTime > 0
        ),
      },
      balanceData: {
        ...balanceData,
        items: balanceData.items.filter(
          (e) => e.extension.defaultRankingPoints !== 0.0 && e.returnAllTime > 0
        ),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
