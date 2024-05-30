import { useEffect, useState } from "react";
import { ParaText, TitleH1 } from "../../../components/Typography";
import { Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";
import { TabContent } from "../crypto/crypto.styles";
import { CRYPTO_CURRENCIES } from "../../../config/enums";
import { useAccountCryptoDepositQuery } from "../../../utils/hooks/queryHooks";
import Loader from "../../../components/Loader";
import styled, { keyframes } from "styled-components";
import { FaCopy } from "react-icons/fa";
import AccountSelect from "../../../components/AccountSelect";
import { useRouter } from "next/router";

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const ripple = keyframes`
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.5;
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
  }
`;

const CryptoAddressBox = styled.div`
  border: 1px solid ${theme.colors.grayColor};
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;

  p {
    padding: 10px;
  }

  button {
    position: relative;
    all: unset;
    color: ${theme.colors.secondaryBlack};
    border-left: 1px solid ${theme.colors.grayColor};
    padding: 10px;
    cursor: pointer;
    &:hover {
      color: ${theme.colors.primaryBlue};
    }

    span {
      color: ${theme.colors.secondaryBlack};
      position: absolute;
      top: -4px;
      right: 0;
      border: 1px solid ${theme.colors.secondaryBlack};
      opacity: 0;
      padding: 4px;
      border-radius: 5px;
      animation: ${ripple} 1s linear;
    }
  }
`;

export default function Crypto({ pageTranslations, genericTranslations }) {
  const {
    depositCryptosTitle,
    fldCryptoTxtOne,
    fldCryptoTxtTwo,
    fldChooseAccount,
    fldCryptoTxtThree,
    fldCryptoTxtFour,
    fldTransferTiox,
  } = pageTranslations;

  const { accId, plsSelect } = genericTranslations;
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const selectedAccount = router.query.accountId || "";
  const setSelectedAccount = (v) => {
    router.push(
      {
        query: { ...router.query, accountId: v },
      },
      null,
      { shallow: true }
    );
  };
  const { data, isLoading, error } =
    useAccountCryptoDepositQuery(selectedAccount);

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      let timeout = setTimeout(() => setCopied(false), 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [copied]);

  return (
    <TabContent>
      <TitleH1
        mt={"10px"}
        mb={"10px"}
        txtalign={"center"}
        txtcolor={theme.colors.secondaryBlack}
        className="title_lg"
      >
        {depositCryptosTitle}
      </TitleH1>
      <ParaText pmt={"0px"} pmb={"30px"}>
        {fldCryptoTxtTwo}
      </ParaText>
      <Dflex column style={{ gap: "25px" }}>
        <AccountSelect
          enviroment="live"
          width="300"
          value={selectedAccount}
          onChange={(val) => {
            setSelectedCurrency(val.currency);
            setSelectedAccount(val._id);
          }}
          filter={(account) =>
            account.provider !== "innovoult" &&
            CRYPTO_CURRENCIES.includes(account.currency)
          }
          label={accId}
          optionsLabel={plsSelect}
        />
        <InfoBox>
          <Loader isLoading={isLoading} />
          {!selectedAccount ? (
            <p>{fldChooseAccount}</p>
          ) : (
            <>
              <p>
                {fldCryptoTxtThree}{" "}
                <strong>{String(selectedCurrency).toUpperCase()}</strong>{" "}
                {fldCryptoTxtFour}
              </p>
              <CryptoAddressBox>
                <p>{data?.address}</p>
                <button
                  onClick={() => {
                    if (copied) return;
                    navigator.clipboard.writeText(data?.address);
                    setCopied(true);
                  }}
                >
                  <FaCopy />
                  {copied && <span>Copied</span>}
                </button>
              </CryptoAddressBox>
            </>
          )}
        </InfoBox>
      </Dflex>
    </TabContent>
  );
}
