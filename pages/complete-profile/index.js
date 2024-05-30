import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import { Container } from "../../styles/sharedstyles";
import CompleteProfilePage from "../../views/complete-profile/CompleteProfile";
import { languages, i18n } from "../../config/languageConfig";

const CompleteProfile = ({ langObject, pageTranslations }) => {
  return (
    <Container>
      <HeadMetaData meta={METADATA_TEXTS["complete-profile"].meta}>
        <CompleteProfilePage pageTranslations={pageTranslations} />
      </HeadMetaData>
    </Container>
  );
};
export default CompleteProfile;

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      pageTranslations: i18n(
        languages[locale] ?? languages["en"],
        "completeProfilePage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
