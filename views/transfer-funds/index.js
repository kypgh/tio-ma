import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import { theme } from "../../styles/theme";
import styled from "styled-components";
import { BiTransferAlt } from "react-icons/bi";
import {
  useGetExchangeRate,
  useGetUserAccountById,
} from "../../utils/hooks/queryHooks";
import { useMutation } from "react-query";
import agent from "../../utils/agent";
import CurrencyInput from "../../components/inputs/CurrencyInput";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";
import { useNotification } from "../../components/actionNotification/NotificationProvider";
import Loader from "../../components/Loader";
import Link from "next/link";
import SuccessScreen from "../../components/SuccessScreen";
import AccountSelect from "../../components/AccountSelect";

const Container = styled.div`
  padding: 20px 0;
`;

const FullWidth = styled.div`
  width: 100%;
  gap: 15px;
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: space-evenly;
  @media only screen and (max-width: 650px) {
    flex-direction: column;
  }
  & svg {
    width: 50px;
  }
  & p {
    text-align: center;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${theme.colors.mainBlack};
  width: 100%;
  text-align: center;
  margin-bottom: 50px;
`;

const SelectAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 350px;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 25px auto;
`;

const SuccessTransfer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  height: 100%;
  justify-content: space-between;
  /* flex-direction: column; */
`;

const CURRENCY_INFO = {
  BTC: {
    name: "BTC",
    dec: 8,
    symbol: "₿",
  },
  USDT: {
    name: "USDT",
    dec: 2,
    symbol: "₮",
  },
  USDC: {
    name: "USDC",
    dec: 8,
    symbol: "$USDC",
  },
  ETH: {
    name: "ETH",
    dec: 8,
    symbol: "Ξ",
  },
  EUR: {
    name: "EUR",
    dec: 2,
    symbol: "€",
  },
  USD: {
    name: "USD",
    dec: 2,
    symbol: "$",
  },
  GBP: {
    name: "GBP",
    dec: 2,
    symbol: "£",
  },
  CAD: {
    name: "CAD",
    dec: 2,
    symbol: "$",
  },
  AUD: {
    name: "AUD",
    dec: 2,
    symbol: "$",
  },
};
const TransferFundsView = ({ pageTranslations }) => {
  const {
    title,
    from: fromText,
    to: toText,
    transfer,
    transferAgain,
    back,
    transferSucc,
  } = pageTranslations;

  const router = useRouter();
  const { accountId } = router.query;
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [succTransfer, setSuccTransfer] = useState(false);

  const { data: defaultAcc } = useGetUserAccountById(accountId, {
    enabled: !!accountId,
    initialData: {},
  });

  useEffect(() => {
    if (defaultAcc.account) setFrom(defaultAcc.account);
  }, [defaultAcc]);

  const erQuery = useGetExchangeRate(from?.currency, to?.currency, {
    onSuccess: (res) => {
      fromAmountTo(fromAmount, res.rate);
    },
  });

  const swapAccounts = () => {
    if (!from && !to) return;
    setErrorMsg("");
    if (!to) {
      const temp = from;
      setFrom(to);
      setTo(temp);
      return;
    }
    if (to?.balance > 0) {
      const temp = from;
      setFrom(to);
      setTo(temp);
    } else {
      setTo(from);
      setFrom({});
      setErrorMsg(`Insufficient funds for account ${to.login_id}`);
    }
  };

  const notify = useNotification();
  useEffect(() => {
    if (parseFloat(from?.balance) < parseFloat(fromAmount)) {
      setErrorMsg(`Insufficient funds for account!! ${from.login_id}`);
    } else {
      setErrorMsg("");
    }
  }, [fromAmount, from]);

  const transferFunds = useMutation(
    ({ accountFrom, accountTo, amount }) =>
      agent().transferFunds({ accountFrom, accountTo, amount }),
    {
      onSuccess: (res) => {
        setSuccTransfer(true);
        notify.SUCCESS("Transfer successful");
      },
    }
  );

  // transferFunds.isLoading()

  // useEffect(() => {
  //   if (!isNaN(+fromAmount)) {
  //     fromAmountTo(fromAmount, erQuery.data?.rate);
  //   } else {
  //     toAmountFrom(toAmount, erQuery.data?.rate);
  //   }
  // }, [fromAmount]);

  const fromAmountTo = (currency, rate) => {
    console.log("Fromamountto:  ", currency, rate);
    let res = parseFloat(currency) * parseFloat(rate);
    if (!isNaN(res)) {
      setToAmount(+res.toFixed(CURRENCY_INFO[to?.currency]?.dec ?? 2));
    }
  };

  const toAmountFrom = (currency, rate) => {
    let res = parseFloat(currency) / parseFloat(rate);
    if (!isNaN(res)) {
      setFromAmount(+res.toFixed(CURRENCY_INFO[from?.currency]?.dec ?? 2));
    }
  };

  return (
    <RightContainer>
      <Mcontainer bxshadow={theme.colors.primaryBoxShadow} hideRefetch>
        <Container>
          <Title>{title}</Title>
          {transferFunds.isLoading ? (
            <Loader isLoading={true} />
          ) : succTransfer ? (
            <SuccessTransfer>
              <SuccessScreen />
              <FullWidth>
                <BtnContainer>
                  <Link href={{ pathname: "/myaccount" }}>
                    <ButtonSecondary
                      width="200px"
                      onClick={() => setSuccTransfer(false)}
                      style={{
                        marginTop: "25px",
                      }}
                    >
                      {back}
                    </ButtonSecondary>
                  </Link>

                  <ButtonPrimary
                    width="200px"
                    onClick={() => setSuccTransfer(false)}
                    style={{
                      marginTop: "25px",
                    }}
                  >
                    {transferAgain}
                  </ButtonPrimary>
                </BtnContainer>
              </FullWidth>
            </SuccessTransfer>
          ) : (
            <>
              <FullWidth>
                <SelectAccountContainer>
                  <AccountSelect
                    id="from"
                    enviroment="live"
                    label={fromText}
                    onChange={(account) => {
                      setFrom(account);
                      if (!account?._id) setFromAmount("");
                    }}
                    // width="300px"
                    disableZeroBalance={true}
                    filter={(el) => el._id !== to?._id}
                    value={from?._id}
                  />
                  <CurrencyInput
                    label={`From Amount ${
                      CURRENCY_INFO[from?.currency]?.name ?? ""
                    }`}
                    currencyType={from?.currency}
                    value={fromAmount}
                    onChange={(val) => {
                      setFromAmount(val);
                      if (!isNaN(val)) {
                        fromAmountTo(val, erQuery.data?.rate);
                      }
                    }}
                    symbol={CURRENCY_INFO[from?.currency]?.symbol}
                    decimalsAmount={CURRENCY_INFO[from?.currency]?.dec ?? 2}
                  />
                </SelectAccountContainer>
                <BiTransferAlt
                  size={30}
                  color={theme.colors.primaryColor}
                  style={{ cursor: "pointer" }}
                  onClick={() => swapAccounts()}
                />

                <SelectAccountContainer>
                  <AccountSelect
                    id="to"
                    enviroment="live"
                    label={toText}
                    onChange={(account) => {
                      setTo(account);
                      if (!account?._id) setToAmount("");
                    }}
                    // width="300px"
                    filter={(el) => el._id !== from?._id}
                    value={to?._id}
                  />
                  <CurrencyInput
                    label={`To Amount ${
                      CURRENCY_INFO[to?.currency]?.name ?? ""
                    } (estimated)`}
                    currencyType={to?.currency}
                    value={toAmount}
                    onChange={(val) => {
                      setToAmount(val);
                      if (!isNaN(fromAmount) && !isNaN(val)) {
                        toAmountFrom(val, erQuery.data?.rate);
                      }
                    }}
                    symbol={CURRENCY_INFO[to?.currency]?.symbol}
                    decimalsAmount={CURRENCY_INFO[to?.currency]?.dec ?? 2}
                  />
                </SelectAccountContainer>
              </FullWidth>
              <FullWidth style={{ marginTop: "25px" }}></FullWidth>
              <FullWidth>{errorMsg && <p>{errorMsg}</p>}</FullWidth>
              <FullWidth>
                <ButtonPrimary
                  disabled={
                    !from?._id ||
                    !to?._id ||
                    !toAmount ||
                    transferFunds.isLoading ||
                    parseFloat(from?.balance) < parseFloat(fromAmount)
                  }
                  onClick={() =>
                    transferFunds.mutate({
                      accountFrom: from?._id,
                      accountTo: to?._id,
                      amount: fromAmount,
                    })
                  }
                  style={{
                    marginTop: "50px",
                  }}
                >
                  {transfer}
                </ButtonPrimary>
              </FullWidth>
            </>
          )}
        </Container>
      </Mcontainer>
    </RightContainer>
  );
};

export default TransferFundsView;
