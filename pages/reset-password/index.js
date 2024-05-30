import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import { Container } from "../../styles/sharedstyles";
import ResetPasswordPage from "../../views/reset-password";
import { languages, i18n } from "../../config/languageConfig";

const ResetPassword = ({ pageTranslations }) => {
  return (
    <Container>
      <HeadMetaData meta={METADATA_TEXTS["reset-password"].meta}>
        <ResetPasswordPage pageTranslations={pageTranslations} />
      </HeadMetaData>
    </Container>
  );
};

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      pageTranslations: i18n(
        languages[locale] ?? languages["en"],
        "resetPasswordPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}

export default ResetPassword;
