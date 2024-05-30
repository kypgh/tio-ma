import { useState } from "react";
import {
  TabContent,
  TtableResponsive,
  TableLang,
  TRl,
  TDl,
  TableBody,
} from "../gbp-lang-wire/gbp-lang-wire.styles";

export default function GBPLangWire({pageTranslations}) {
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
        <TableLang className="arrow-top-gbp">
          <TableBody className="CTable">
            <TRl>
              <TDl>{fldBeneficiaryName}:</TDl>
              <TDl>MATIC ONE PORTAL</TDl>
            </TRl>
            <TRl>
              <TDl>{fldBeneficiaryAddress}:</TDl>
              <TDl>
                OFFICE 8-066, AL MHEIRI BUILDING, RAS AL KHOR, DUBAI, UAE
              </TDl>
            </TRl>
            <TRl>
              <TDl>{fldIBAN}:</TDl>
              <TDl>AE82 0240 0975 2125 4988 703</TDl>
            </TRl>
            <TRl>
              <TDl>{fldSWIFT}/{fldIBIC}:</TDl>
              <TDl>DUIBAEADXXX</TDl>
            </TRl>
            <TRl>
              <TDl>{fldBeneficiaryBankAddress}:</TDl>
              <TDl>DUBAI ISLAMIC BANK</TDl>
            </TRl>
            <TRl>
              <TDl>{fldBankAddress}:</TDl>
              <TDl>SHEIKH ZAYED ROAD, DUBAI</TDl>
            </TRl>
            <TRl>
              <TDl>*{fldRefNo}:</TDl>
              <TDl>PMS - Client id - TIO288</TDl>
            </TRl>
          </TableBody>
        </TableLang>
      </TtableResponsive>
    </TabContent>
  );
}
