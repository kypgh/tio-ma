import Alink from "../../components/Alink";
import { Container } from "../../styles/sharedstyles";
import { Footer, FooterTextNote, FooterManu } from "./footer.styles";
import { theme } from "../../styles/theme";

const StyledLink = ({ href, name }) => (
  <Alink
    target={"_blank"}
    href={href}
    name={name}
    style={{ fontSize: "14px", fontWeight: 600, color: theme.colors.darkGray }}
  />
);

export default function Footers({ genericTranslations = {} }) {
  const brandBaseUrl = process.env.NEXT_PUBLIC_TIO_MARKETS_URL;

  const {
    footerRisk2,
    footerRisk3,
    footerTextNoteBold,
    footerRisk1,
    rightsReserved,
    docAml,
    docClientAgree,
    docOrderEx,
    docPPolicy,
    docRiskDisclosure,
  } = genericTranslations;

  const legalDocuments = {
    PRIVACY_POLICY: {
      label: docPPolicy,
      url: `${brandBaseUrl}/legal-documents/privacy-policy`,
    },
    RISK_DISCLOSURE: {
      label: docRiskDisclosure,
      url: `${brandBaseUrl}/legal-documents/risk-disclosure`,
    },
    ORDER_EXECUTION_POLICY: {
      label: docOrderEx,
      url: `${brandBaseUrl}/legal-documents/execution-policy`,
    },
    CLIENT_AGREEMENT: {
      label: docClientAgree,
      url: `${brandBaseUrl}/legal-documents/client-agreement`,
    },
    AML_POLICY: {
      label: docAml,
      url: `${brandBaseUrl}/legal-documents/aml-policy`,
    },
  };

  const docsArray = Object.values(legalDocuments);
  return (
    <Container>
      <Footer
        style={{
          margin: "auto",
        }}
      >
        <FooterTextNote>
          <p>
            <strong>{footerTextNoteBold} </strong>
            {footerRisk1}
          </p>
          <p>{footerRisk2}</p>
          <p>{footerRisk3}</p>
          <p>{`@ ${new Date().getFullYear()} ${rightsReserved}`}</p>
        </FooterTextNote>
        <FooterManu>
          {docsArray.map((doc, idx) => (
            <StyledLink href={doc.url} name={doc.label} key={idx} />
          ))}
        </FooterManu>
      </Footer>
    </Container>
  );
}
