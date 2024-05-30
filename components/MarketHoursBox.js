import styled from "styled-components";
import { device } from "../styles/device";
import { theme } from "../styles/theme";
import useMarketHours from "../utils/hooks/useMarketHours";

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: calc(50% - 7.5px);
  border: 1px solid ${theme.colors.sixLightGray};
  padding: 5px;
  border-radius: 5px;

  @media ${device.tablet} {
    width: 100%;
  }
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${theme.colors.darkGray};
`;

const Hour = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${theme.colors.lightGray};
`;

const P = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.mainBlack};
`;

const StatusBox = styled.div`
  padding: 3px;
  font-weight: 700;
  background-color: ${({ status }) =>
    status ? theme.colors.primaryColorGreen : theme.colors.primaryRed};
  border-radius: 5px;
  min-width: 60px;
  text-align: center;

  & > p {
    color: ${theme.colors.mainWhite};
  }
`;

const MarketHoursBox = ({
  title,
  type,
  timeZone = "America/New_York",
  hours = [],
  pageTranslations,
}) => {
  const {
    hours: h,
    minutes,
    isMarketOpen,
    time,
    status,
  } = useMarketHours(hours, timeZone);

  const { opensIn, closesIn } = pageTranslations;

  return (
    <Outer>
      <Row>
        <Title>{title}</Title>
        <Hour>{time.format("hh:mm A")}</Hour>
      </Row>
      <Row>
        <P>{type}</P>
        <StatusBox status={isMarketOpen}>
          <P>{status}</P>
        </StatusBox>
      </Row>
      <Row>
        <P>{isMarketOpen ? closesIn : opensIn}</P>
        <P>{`${String(h).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}`}</P>
      </Row>
    </Outer>
  );
};

export default MarketHoursBox;
