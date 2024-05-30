import React from "react";
import styled from "styled-components";
import Script from "next/script";
import { NEXT_PUBLIC_CASHIER_URL } from "@/config/enums";

const CashierContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 15px;

  &#cashier-block {
    display: flex;
    width: 100%;
    height: 100%;
  }

  & iframe {
    /* height: 100vh; */
    min-height: calc(100vh - 40px);
    width: 100vw;
    & ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  height: 100%;
`;

const PraxisCashierComp = ({ authToken, setHasLoaded }) => {
  const loadCashier = () => {
    const CONTAINER = document.getElementById("cashier-block");
    const MODE = "iframe";

    let cashier = PraxisCashier({
      auth_token: authToken, // auth_token received in response to API call
      container: CONTAINER, // block where the cashier iframe or cashier window controls will be added
      autoclose: false, // whether to close the cashier window upon transaction attempt
      mode: MODE, // supported values: 'iframe', 'tab', 'window'
      locale: "en-GB", // optional, locale for Praxis login button, browser locale is default
    });

    // if you override this method, please make sure to adjust the iframe size
    cashier.on("resize", function (data) {
      if (MODE === "iframe") {
        let iframe = cashier.getCashierIframe();
        console.log("iframe");
        if (iframe) {
          iframe.style.height = data.height + "px";
        }
      }
    });

    cashier.on("payment_method_selected", function (data) {
      console.log(data.payment_method);
    });

    // if set, this callback will override the autoclose setting
    cashier.on("transaction_attempted", function (data) {
      console.log(data.transaction.amount);
      console.log(data.transaction.currency);
      console.log(data.transaction.transaction_status);
    });

    cashier.render();
    // setHasLoaded(true);
  };

  if (!authToken) return null;
  return (
    <Container>
      <Script
        src={NEXT_PUBLIC_CASHIER_URL}
        id="cashierTest"
        onReady={loadCashier}
      ></Script>
      <CashierContainer id="cashier-block"></CashierContainer>
    </Container>
  );
};

export default PraxisCashierComp;
