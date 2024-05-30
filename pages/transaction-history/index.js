import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import TransactionHistoryPage from "../../views/transaction-history";
import { languages, i18n } from "../../config/languageConfig";

export default function TransactionHistory({ pageTranslations }) {
  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS["transaction-history"].meta}>
        <TransactionHistoryPage pageTranslations={pageTranslations} />
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
        "transactionHistoryPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
