import React from "react";
import { Container } from "../../styles/sharedstyles";
import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import VeridyEmail from "../../views/verify-email/VeridyEmail";
import { i18n, languages } from "../../config/languageConfig";

const VerifyEmail = () => {
  return (
    <Container>
      <HeadMetaData meta={METADATA_TEXTS["verify-email"].meta}>
        <VeridyEmail />
      </HeadMetaData>
    </Container>
  );
};

export default VerifyEmail;

export async function getStaticProps(context) {
  const { locale } = context;
  return {
    props: {
      pageTranslations: {},
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
