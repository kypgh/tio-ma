import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import AnalyticsPage from "../../views/download-center";
import { languages, i18n } from "../../config/languageConfig";

export default function DownloadCenter({ langObject, pageTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS["download-center"].meta}>
        <AnalyticsPage pageTranslations={pageTranslations} />
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
        "downloadCenterPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
