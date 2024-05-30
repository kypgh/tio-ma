import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import styled from "styled-components";

import loadingAnimation from "../public/assets/animations/tioLoader.json";

export const Lottie = ({
  animationData,
  width,
  height,
  loop = false,
  autoPlay = true,
  mBottom = 25,
  filter = "brightness(1)",
  style = {},
}) => {
  const element = useRef(null);
  const lottieInstance = useRef();
  const hasLoaded = useRef(true);

  useEffect(() => {
    if (hasLoaded.current) {
      if (element.current) {
        lottieInstance.current = lottie.loadAnimation({
          animationData,
          loop: loop,
          autoplay: autoPlay,
          container: element.current,
          playCount: 0,
        });
      }
      hasLoaded.current = false;
    }
  }, [animationData]);

  return (
    <div
      style={{
        width,
        height,
        marginBottom: mBottom,
        transition: `all 0.15s linear`,
        filter: filter,
        pointerEvents: "none",
        ...style,
      }}
      ref={element}
    ></div>
  );
};

const LoaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ bgOpacity }) => `rgba(255, 255, 255, ${bgOpacity})`};
  backdrop-filter: blur(3px);
  z-index: 9999;
`;

/**
 * @param {{style: React.CSSProperties, bgOpacity: Number, width: Number, height: Number, isLoading: Boolean }} param0
 * @returns {React.Component}
 *
 * This is used with the table component!
 */
const Loader = ({
  bgOpacity = 0.5,
  width = 120,
  height = 120,
  isLoading = false,
  style,
}) => {
  if (!isLoading) return null;
  return (
    <LoaderContainer bgOpacity={bgOpacity} style={style}>
      <Lottie
        animationData={loadingAnimation}
        mBottom="0"
        autoPlay={true}
        loop={true}
        width={width}
        height={height}
      />
    </LoaderContainer>
  );
};

export default Loader;
