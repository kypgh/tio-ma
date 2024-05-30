import ButtonPrimary from "../../../components/Buttons/ButtonPrimary";
import Dropdown from "../../../components/inputs/Dropdown";
import Input from "../../../components/inputs/Input";
import { TitleH4 } from "../../../components/Typography";
import { Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";
import { OthersMain, TabContent } from "./other.styles";

export default function Other({ pageTranslations }) {
  const { depositDivepay, minimumDeposit, btndepositslabelC } =
    pageTranslations;

  const soption = ["USD", "INR"];
  const Title = [
    "MT5 Acc: 801819 (TIO 1947.46000000)",
    "MT4 Acc: 801819 (TIO 1947.46000000)",
  ];
  return (
    <TabContent>
      <OthersMain>
        <form onSubmit={(e) => e.preventDefault()}>
          <TitleH4
            txtalign={"center"}
            mt={"23px"}
            txtcolor={theme.colors.secondaryBlack}
            className="title_sm"
          >
            {depositDivepay}
          </TitleH4>
          <Dflex column style={{ gap: "25px" }}>
            <Input
              width={"345px"}
              placeholder={""}
              label="Amount"
              color={theme.colors.mainWhite}
            />
            <span>{minimumDeposit}: 5 USD</span>
            <Dropdown
              label={"Currency"}
              options={soption}
              width={"345px"}
              color={theme.colors.mainWhite}
            />

            <ButtonPrimary width={"186px"}>{btndepositslabelC}</ButtonPrimary>
          </Dflex>
        </form>
      </OthersMain>
    </TabContent>
  );
}
