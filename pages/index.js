import { languages, i18n } from "../config/languageConfig";
import { Container } from "@/styles/sharedstyles";
import HeadMetaData from "@/components/HeadMetaData";
import { METADATA_TEXTS } from "@/constants/metadata";
import LoginView from "@/views/login";
//stagi
const Home = ({ pageTranslations }) => {
  return (
    <Container>
      <HeadMetaData meta={METADATA_TEXTS.index.meta}>
        <LoginView pageTranslations={pageTranslations} />
      </HeadMetaData>
    </Container>
  );
};

export async function getStaticProps(context) {
  const { locale } = context;

  return {
    props: {
      pageTranslations: i18n(languages[locale] ?? languages["en"], "loginPage"),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
export default Home;
