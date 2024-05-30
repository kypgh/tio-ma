import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import MyaccountPage from "../../views/myaccount";
import { languages, i18n } from "../../config/languageConfig";

export default function Myaccount({ pageTranslations, genericTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.myaccount.meta}>
        <MyaccountPage
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
        ...i18n(languages[locale] ?? languages["en"], "myAccountPage"),
        ...i18n(languages[locale] ?? languages["en"], "generic"),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
