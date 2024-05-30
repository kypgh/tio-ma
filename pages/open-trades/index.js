import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import OpenTrades from "../../views/myaccount/open-trades";
import { languages, i18n } from "../../config/languageConfig";

export default function OpenTradesPage({ pageTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.OpenTrades.meta}>
        <OpenTrades pageTranslations={pageTranslations} />
      </HeadMetaData>
    </>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      pageTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "myAccountPage"),
        ...i18n(languages[locale] ?? languages["en"], "openTradesPage"),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
