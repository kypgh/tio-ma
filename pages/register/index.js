import HeadMetaData from "../../components/HeadMetaData";
import { i18n, languages } from "../../config/languageConfig";
import { METADATA_TEXTS } from "../../constants/metadata";
import { Container } from "../../styles/sharedstyles";
import RegisterPage from "../../views/register/RegisterPage";

const Login = ({ pageTranslations }) => {
  return (
    <Container>
      <HeadMetaData meta={METADATA_TEXTS["register"].meta}>
        <RegisterPage pageTranslations={pageTranslations} />
      </HeadMetaData>
    </Container>
  );
};

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
      pageTranslations: i18n(
        languages[locale] ?? languages["en"],
        "signUpPage"
      ),
    }, // will be passed to the page component as props
  };
}
export default Login;
