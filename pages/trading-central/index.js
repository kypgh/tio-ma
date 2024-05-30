import React, { useEffect } from "react";
import HeadMetaData from "../../components/HeadMetaData";
import TradingCentralView from "../../views/trading-central/TradingCentralView";
import { METADATA_TEXTS } from "../../constants/metadata";
import { i18n, languages } from "../../config/languageConfig";
import useIsEligibleForTC from "../../utils/hooks/useIsEligibleForTC";
import { useRouter } from "next/router";

const TradingCentral = ({ genericTranslations }) => {
  const { isEligible, isLoading } = useIsEligibleForTC();
  const router = useRouter();

  useEffect(() => {
    if (!isEligible && !isLoading) {
      router.push("/dashboard");
    }
  }, [isEligible, isLoading]);

  return (
    <HeadMetaData meta={METADATA_TEXTS.tradingCentral.meta}>
      <TradingCentralView />
    </HeadMetaData>
  );
};

export default TradingCentral;

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
