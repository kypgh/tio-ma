const brandBaseUrl = process.env.NEXT_PUBLIC_TIO_MARKETS_URL;

// this is in footer
export default {
  PRIVACY_POLICY: {
    label: "PRIVACY POLICY",
    url: `${brandBaseUrl}/legal-documents/privacy-policy.pdf`,
  },
  RISK_DISCLOSURE: {
    label: "RISK DISCLOSURE",
    url: `${brandBaseUrl}/legal-documents/risk-disclosure.pdf`,
  },
  ORDER_EXECUTION_POLICY: {
    label: "ORDER EXECUTION POLICY",
    url: `${brandBaseUrl}/legal-documents/execution-policy.pdf`,
  },
  CLIENT_AGREEMENT: {
    label: "CLIENT AGREEMENT",
    url: `${brandBaseUrl}/legal-documents/client-agreement.pdf`,
  },
  AML_POLICY: {
    label: "AML POLICY",
    url: `${brandBaseUrl}/legal-documents/aml-policy.pdf`,
  },
};
