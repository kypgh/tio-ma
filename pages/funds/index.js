import React from "react";
import { i18n, languages } from "../../config/languageConfig";
import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import FundsView from "../../views/funds/FundsView";

const Funds = ({ pageTranslations, genericTranslations }) => {
  return (
    <HeadMetaData meta={METADATA_TEXTS.funds.meta}>
      <FundsView
        pageTranslations={pageTranslations}
        genericTranslations={genericTranslations}
      />
    </HeadMetaData>
  );
};

export default Funds;

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      pageTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "depositPage"),
        ...i18n(languages[locale] ?? languages["en"], "withdrawalsPage"),
        ...i18n(languages[locale] ?? languages["en"], "transactionHistoryPage"),
        ...i18n(languages[locale] ?? languages["en"], "generic"),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
