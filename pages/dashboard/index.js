import { useState, useEffect } from "react";
import HeadMetaData from "../../components/HeadMetaData";
import { METADATA_TEXTS } from "../../constants/metadata";
import DashboardView from "../../views/dashboard";
import { languages, i18n } from "../../config/languageConfig";

export default function Myaccount({ pageTranslations, genericTranslations }) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    return () => {
      setIsHydrated(false);
    };
  }, []);

  return (
    <>
      <HeadMetaData meta={METADATA_TEXTS.myaccount.meta}>
        {isHydrated && (
          <DashboardView
            pageTranslations={pageTranslations}
            genericTranslations={genericTranslations}
          />
        )}
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
        "dashboardPage"
      ),
      genericTranslations: {
        ...i18n(languages[locale] ?? languages["en"], "generic"),
        ...i18n(languages[locale] ?? languages["en"], "footerSection"),
      },
    }, // will be passed to the page component as props
  };
}
