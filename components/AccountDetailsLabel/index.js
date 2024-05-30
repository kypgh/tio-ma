import { AccountDetail, Label, SpanTxt } from "./Accountdetailslabel.styles";

export default function AccountDetailsLabel({ label, txt }) {
  return (
    <>
      <AccountDetail>
        <Label>{label}</Label>
        <SpanTxt>{txt}</SpanTxt>
      </AccountDetail>
    </>
  );
}
