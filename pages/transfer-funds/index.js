import React from "react";
import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import TransferFundsView from "../../views/transfer-funds";
import { languages, i18n } from "../../config/languageConfig";

const TransferFunds = ({ pageTranslations }) => {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.transferFunds.meta}>
        <TransferFundsView pageTranslations={pageTranslations} />
      </HeadMetaData>
    </>
  );
};

export default TransferFunds;

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      pageTranslations: i18n(
        languages[locale] ?? languages["en"],
        "transferFundsPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
