import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import ClosedTrades from "../../views/myaccount/closed-trades";
import { languages, i18n } from "../../config/languageConfig";

export default function ClosedTradesPage({ pageTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.ClosedTrades.meta}>
        <ClosedTrades pageTranslations={pageTranslations} />
      </HeadMetaData>
    </>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      pageTranslations: i18n(
        languages[locale] ?? languages["en"],
        "closedTrades"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
