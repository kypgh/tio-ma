import Dropdown from "@/components/inputs/Dropdown";
import {
  BANKWIRE_CAD,
  BANKWIRE_CZK,
  BANKWIRE_EUR,
  BANKWIRE_GBP,
  BANKWIRE_USD,
} from "@/config/bankwireDetails";
import { device } from "@/styles/device";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import AccountSelect from "../../../components/AccountSelect";
import { TitleH2, TitleH4 } from "../../../components/Typography";
import { supportEmail } from "../../../constants/brand";
import { theme } from "../../../styles/theme";
import BankwireView from "../bankwireView/BankwireView";

const Container = styled.div`
  padding: 40px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
`;

const NoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 580px;
  margin-bottom: 20px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;

  @media ${device.mobile} {
    flex-wrap: wrap;
  }
`;

const banwireObj = {
  EUR: BANKWIRE_EUR,
  // AUD: BANKWIRE_AUD,
  GBP: BANKWIRE_GBP,
  USD: BANKWIRE_USD,
  CAD: BANKWIRE_CAD,
  CZK: BANKWIRE_CZK,
};

const availableCurrencies = Object.keys(banwireObj);

const index = ({ pageTranslations, genericTranslations }) => {
  const router = useRouter();

  const selectedCurrency = router.query.currency || "";
  const selectedAccount = router.query.accountId || "";

  const goToAccount = (accountId, currency) => {
    router.push(
      {
        query: { ...router.query, accountId, currency },
      },
      null,
      { shallow: true }
    );
  };

  const {
    localTitle,
    pleaseClick,
    pleaseDo,
    pleaseDo2,
    bwT1,
    bwT2,
    bwSub,
    bwSub2,
  } = pageTranslations;
  const { accId, plsSelect } = genericTranslations;

  return (
    <Container style={{ paddingTop: 0 }}>
      <TitleH2 style={{ marginBottom: 0 }}>{localTitle}</TitleH2>
      <Flex>
        <AccountSelect
          enviroment="live"
          width="300px"
          value={selectedAccount}
          onChange={(val) => {
            goToAccount(val._id, val.currency);
          }}
          filter={(account) => availableCurrencies.includes(account.currency)}
          label={accId}
          optionsLabel={plsSelect}
        />

        <Dropdown
          width="150px"
          label="Currency"
          options={availableCurrencies}
          value={selectedCurrency}
          onChange={(e) => {
            goToAccount(selectedAccount, e.target.value);
          }}
          style={{
            borderColor: theme.colors.primaryColor,
            color: theme.colors.primaryColor,
          }}
        />
      </Flex>
      {selectedCurrency && (
        <>
          <TitleH4
            style={{ maxWidth: "630px", textAlign: "center" }}
          >{`${bwT1} ${selectedCurrency}. ${bwT2}`}</TitleH4>
          <p>{bwSub}</p>

          <TitleH2
            style={{ marginBottom: 0 }}
          >{`${bwSub2} ${banwireObj[selectedCurrency].displayName}`}</TitleH2>
        </>
      )}

      {/* {selectedAccount && (
        <OpenpaydView
          pageTranslations={pageTranslations}
          selectedAccount={selectedAccount}
        />
      )} */}

      {selectedAccount && (
        <BankwireView
          pageTranslations={pageTranslations}
          selectedAccount={selectedAccount}
          selectedCurrency={selectedCurrency}
          banwireObj={banwireObj}
        />
      )}

      <NoteContainer>
        <TitleH4 style={{ textAlign: "center" }}>
          {pleaseDo}{" "}
          <Link
            style={{ color: theme.colors.primaryColor }}
            href={`mailto:${supportEmail}`}
          >
            {pleaseDo2}
          </Link>
        </TitleH4>
      </NoteContainer>
    </Container>
  );
};

export default index;
