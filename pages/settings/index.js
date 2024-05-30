import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import { languages, i18n } from "../../config/languageConfig";
import SettingsView from "../../views/settings";

export default function Settings({ pageTranslations, genericTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.settings.meta}>
        <SettingsView
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
      pageTranslations: i18n(
        languages[locale] ?? languages["en"],
        "settingsPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
