import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import WithdrawalsPage from "../../views/withdrawals";
import { languages, i18n } from "../../config/languageConfig";

export default function Withrawals({ pageTranslations, genericTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.withdrawals.meta}>
        <WithdrawalsPage
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
        ...i18n(languages[locale] ?? languages["en"], "withdrawalsPage"),
        ...i18n(languages[locale] ?? languages["en"], "generic"),
      },
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
