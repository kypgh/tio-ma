import React from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import { TitleH1 } from "../../components/Typography";
import {
  Tab,
  TabBody,
  TabButton,
  TabContainer,
  TabHead,
} from "../myaccount/myaccount.styles";
import ForexDashboard from "../forex-dashboard/ForexDashboard";
import { theme } from "../../styles/theme";
import { useRouter } from "next/router";
import EducationVideosNew from "../educational-videos/EducationVideosNew";

const TradingToolsView = ({
  pageTranslations,
  youtubeData,
  tutorialVideosData,
}) => {
  const router = useRouter();
  const tab = router.query.tab || "videos";

  const goToEducationalVideos = () => {
    router.push(
      {
        query: { ...router.query, tab: "videos" },
      },
      undefined,
      { shallow: true }
    );
  };

  const goToForexDashboard = () => {
    router.push(
      {
        query: { ...router.query, tab: "dashboard" },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <RightContainer>
      <Mcontainer bxshadow={theme.colors.primaryBoxShadow} hideRefetch>
        <TitleH1 mt={"10px"} mb={"10px"}>
          Trading Tools
        </TitleH1>
        <TabContainer>
          <TabHead>
            <Tab>
              <TabButton
                variant="link"
                className={`tabs ${tab === "videos" && "tabs-active"}`}
                onClick={goToEducationalVideos}
              >
                Educational Videos
              </TabButton>
            </Tab>
            <Tab>
              <TabButton
                variant="link"
                className={`tabs ${tab === "dashboard" && "tabs-active"}`}
                onClick={goToForexDashboard}
              >
                Forex Dashboard
              </TabButton>
            </Tab>
          </TabHead>
          <TabBody>
            {tab === "videos" && (
              <EducationVideosNew
                pageTranslations={pageTranslations}
                youtubeData={youtubeData}
                tutorialVideosData={tutorialVideosData}
              />
            )}
            {tab === "dashboard" && <ForexDashboard />}
          </TabBody>
        </TabContainer>
      </Mcontainer>
    </RightContainer>
  );
};

export default TradingToolsView;
