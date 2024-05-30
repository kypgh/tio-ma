import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import EditLeverage from "../../views/myaccount/edit-leverage";
import { languages, i18n } from "../../config/languageConfig";

export default function EditLeveragePage({
  pageTranslations,
  genericTranslations,
}) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.BalanceOperations.meta}>
        <EditLeverage
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
        ...i18n(languages[locale] ?? languages["en"], "editLeveragePage"),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
