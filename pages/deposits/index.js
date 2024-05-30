import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import DepositsPage from "../../views/deposits";
import { languages, i18n } from "../../config/languageConfig";

//stag
export default function Deposits({ pageTranslations, genericTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.deposits.meta}>
        <DepositsPage
          pageTranslations={pageTranslations}
          genericTranslations={genericTranslations}
        />
      </HeadMetaData>
    </>
  );
}

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      pageTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "depositPage"),
        ...i18n(languages[locale] ?? languages["en"], "generic"),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
