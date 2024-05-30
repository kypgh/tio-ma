import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import { Container } from "../../styles/sharedstyles";
import { languages, i18n } from "../../config/languageConfig";

import ForgetPasswordPage from "../../views/forget-password";

const forgetPassword = ({ pageTranslations }) => {
  return (
    <Container>
      <HeadMetaData meta={METADATA_TEXTS["forget-password"].meta}>
        <ForgetPasswordPage pageTranslations={pageTranslations} />
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
        "forgetPasswordPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
export default forgetPassword;
