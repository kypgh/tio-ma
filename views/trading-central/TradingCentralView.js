import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../../utils/hooks/queryHooks";
import { useRouter } from "next/router";
import styled from "styled-components";
import "../../public/scripts/iframeResizer.min.js";
import Loader from "../../components/Loader";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    width: 0px;
  }
`;

const TradingCentralView = () => {
  const [url, setUrl] = useState("");
  const { data: user } = useCurrentUser();
  const router = useRouter();
  const { locale } = router;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    axios
      .post("/api/tcentral/encrypt", { userId: user._id, language: locale })
      .then((res) => {
        setUrl(res.data.url);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  return (
    <RightContainer>
      <Mcontainer hideRefetch>
        <Iframe
          src={url}
          onLoad={() => {
            iFrameResize();
          }}
        />
      </Mcontainer>
    </RightContainer>
  );
};

export default TradingCentralView;
