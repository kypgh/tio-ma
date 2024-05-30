import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import EducationalVideosPage from "../../views/educational-videos";
import { languages, i18n } from "../../config/languageConfig";

export default function EducationalVideos({ langObject, pageTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS["educational-videos"].meta}>
        <EducationalVideosPage pageTranslations={pageTranslations} />
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
        "educationalVideosPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
