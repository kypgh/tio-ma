import { useState } from "react";
import {
  TabContent,
  TtableResponsive,
  TableLang,
  TRl,
  TDl,
  TableBody,
} from "../usd-lang-wire/usd-lang-wire.styles";

export default function USDLangWire({pageTranslations}) {
  const {
    fldBeneficiaryName,
    fldBeneficiaryAddress,
    fldIBAN,
    fldSWIFT,
    fldIBIC,
    fldBeneficiaryBankAddress,
    fldBankAddress,
    fldRefNo
  } = pageTranslations
  return (
    <TabContent>
      <TtableResponsive>
        <TableLang className="arrow-top-usd">
          <TableBody className="CTable">
            <TRl>
              <TDl>{fldBeneficiaryName}:</TDl>
              <TDl>MONSAS SP. Z O.O.</TDl>
            </TRl>
            <TRl>
              <TDl>{fldBeneficiaryAddress}:</TDl>
              <TDl>Pulawska 2; 02-566 Warsaw; Poland </TDl>
            </TRl>
            <TRl>
              <TDl>{fldIBAN}:</TDl>
              <TDl>BE25648752100582</TDl>
            </TRl>
            <TRl>
              <TDl>{fldSWIFT}/{fldIBIC}:</TDl>
              <TDl>BMPBBEBBVOD</TDl>
            </TRl>
            <TRl>
              <TDl>{fldBeneficiaryBankAddress}:</TDl>
              <TDl>Aion S.A.</TDl>
            </TRl>
            <TRl>
              <TDl>{fldBankAddress}:</TDl>
              <TDl>Av. de la Toison d'Or 26, 1050 Bruxelles, Belgium</TDl>
            </TRl>
            <TRl>
              <TDl>*{fldRefNo}:</TDl>
              <TDl>Your Client ID</TDl>
            </TRl>
          </TableBody>
        </TableLang>
      </TtableResponsive>
    </TabContent>
  );
}
