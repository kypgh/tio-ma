import { useState } from "react";
import styled from "styled-components";
import { device } from "../styles/device";
import { theme } from "../styles/theme";
import Loader from "./Loader";
import RefetchQueries from "./RefetchQueries";

const McontainerSC = styled.div`
  background: ${({ bgcolor }) => (bgcolor ? bgcolor : theme.colors.mainWhite)};
  box-shadow: ${({ bxshadow }) => (bxshadow ? bxshadow : "")};
  border-radius: ${({ bradius }) => (bradius ? bradius : "5px")};
  padding: ${({ pall }) => (pall ? pall : "10px 25px")};
  align-items: ${({ align }) => (align ? align : "")};
  position: relative;

  margin-bottom: ${({ mb }) => (mb ? mb : "")};
  /* min-height: ${({ minh }) => (minh ? minh : "")}; */
  min-height: 720px;

  @media ${device.tablet} {
    margin-bottom: ${({ mbTabletL }) => (mbTabletL ? mbTabletL : "")};
    /* min-height: ${({ minhTabletL }) => (minhTabletL ? minhTabletL : "")}; */
  }

  @media ${device.mobile} {
    padding: 5px 10px;
  }
`;

const Mcontainer = ({ children, hideRefetch, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <McontainerSC {...props}>
      {!hideRefetch && (
        <>
          <Loader isLoading={isLoading} />
          <RefetchQueries
            onLoadingStateChange={(state) => {
              setIsLoading(state);
            }}
          />
        </>
      )}
      {children}
    </McontainerSC>
  );
};
export default Mcontainer;
