import Dropdown from "../../../components/inputs/Dropdown";
import {
  TabContent,
  CDCMain,
  Dinputc,
} from "../credit-debit-card/credit-debit-card.styles";

export default function CreditDebitCard({ pageTranslations }) {
  const { fldCardNumber, fldCurency } = pageTranslations;

  const CardNumber = ["542 289 **** **** 65832"];
  const Curency = ["USD", "EUR", "GBP"];
  const Country = ["Cyprus"];

  return (
    <TabContent>
      <CDCMain>
        <Dinputc>
          <Dropdown
            label={fldCardNumber}
            options={CardNumber}
            width={"314px"}
          />
          <Dropdown label={fldCurency} options={Curency} width={"158px"} />
        </Dinputc>
      </CDCMain>
    </TabContent>
  );
}
