import React, { useState } from "react";
import { RightContainer } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import styled from "styled-components";
import useWindowSize from "../../utils/hooks/useWindowSize";
import images from "../../config/images";
import Image from "next/image";

const Title = styled.h1`
  text-align: center;
  font-weight: 800;
  font-size: 30px;
`;

const SubTitle = styled.h2`
  text-align: center;
  font-weight: 500;
`;

const Section = styled.div`
  padding: 20px 0;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const VidTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  margin: 20px 0px;
`;

const VideosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  row-gap: 50px;
  align-items: stretch;
  counter-reset: div;

  @media (max-width: 991px) {
    justify-content: center;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  counter-increment: div;
  cursor: pointer;
  transition: 0.1s all ease;

  &:hover {
    transform: scale(1.03);
  }

  &::before {
    content: counter(
      ${({ hasIncrement }) => hasIncrement && "div"},
      decimal-leading-zero
    );

    position: absolute;
    bottom: 10px;
    left: -5px;
    width: 40px;
    height: 25px;
    background: linear-gradient(#ff7a04, #ff5e03);
    font-weight: 800;
    font-size: 16px;
    color: #fff;
  }
`;

const ItemVideo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: center;
  gap: 5px;
  max-width: 320px;

  & > h4 {
    font-weight: 800;
    font-size: 16px;
    min-height: 2lh;
  }

  & > p {
    color: #565656;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  z-index: 1;
`;

const ModalContent = styled.div`
  z-index: 2;
  max-width: 850px;
  width: 100%;
  padding: 15px;

  & > iframe {
    width: 100%;
    height: 100%;
    aspect-ratio: 16/9;
  }
`;

const getDetailsFromSnippet = (snippet = {}) => ({
  title: snippet.title,
  description: snippet.description,
  thumbnail: {
    src: snippet.thumbnails?.medium?.url,
    width: snippet.thumbnails?.medium?.width,
    height: snippet.thumbnails?.medium?.height,
  },
});

const EducationVideosNew = ({
  pageTranslations,
  youtubeData,
  tutorialVideosData,
}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { width } = useWindowSize();
  const mobileWidth = 280;

  return (
    <RightContainer>
      <Mcontainer pall={"30px 35px"} hideRefetch>
        <TitleContainer>
          <div>
            <Title>Learn how to trade in 3 hours</Title>
            <SubTitle>{`With these ${
              youtubeData?.items.length || 15
            } video lessons`}</SubTitle>
          </div>
          <Image
            src={images.vidPlayer.src}
            alt={images.vidPlayer.alt}
            width={228}
            height={132}
          />
        </TitleContainer>
        <Section>
          <VidTitle>Trading Videos</VidTitle>
          <VideosContainer>
            {youtubeData?.items.map((video) => {
              const { title, description, thumbnail } = getDetailsFromSnippet(
                video.snippet
              );

              return (
                <ItemVideo className="num" key={video.id}>
                  <ImgContainer
                    hasIncrement={true}
                    onClick={() => {
                      // document.body.style.overflow = "hidden";
                      setSelectedVideo(video.snippet.resourceId.videoId);
                    }}
                  >
                    <Image
                      src={thumbnail.src}
                      width={width > 400 ? thumbnail.width : mobileWidth}
                      height={thumbnail.height}
                      alt="thumbnail"
                    />
                  </ImgContainer>
                  <h4>{title.split("|")[0]}</h4>
                  <p>{`${description.split(" ").slice(0, 20).join(" ")}...`}</p>
                </ItemVideo>
              );
            })}
          </VideosContainer>
        </Section>
        <Section>
          <VidTitle>Open Your Account</VidTitle>
          <VideosContainer>
            {tutorialVideosData?.items.map((video) => {
              const { title, description, thumbnail } = getDetailsFromSnippet(
                video.snippet
              );

              return (
                <ItemVideo className="num" key={video.id}>
                  <ImgContainer
                    hasIncrement={true}
                    onClick={() => {
                      // document.body.style.overflow = "hidden";
                      setSelectedVideo(video.snippet.resourceId.videoId);
                    }}
                  >
                    <Image
                      src={thumbnail.src}
                      width={width > 400 ? thumbnail.width : mobileWidth}
                      height={thumbnail.height}
                      alt="thumbnail"
                    />
                  </ImgContainer>
                  <h4>{title.split("|")[0]}</h4>
                  <p>{`${description.split(" ").slice(0, 20).join(" ")}...`}</p>
                </ItemVideo>
              );
            })}
          </VideosContainer>
          {/* <VideosContainer>
            {tutorialVideosData.map((video) => {
              const { title, description, thumbnail } = getDetailsFromSnippet(
                video.snippet
              );

              return (
                <ItemVideo className="num" key={video?.id}>
                  <ImgContainer
                    onClick={() => {
                      setSelectedVideo(video.id);
                      // document.body.style.overflow = "hidden";
                    }}
                  >
                    <Image
                      src={thumbnail.src}
                      width={width > 400 ? thumbnail.width : mobileWidth}
                      height={thumbnail.height}
                      alt="thumbnail"
                      priority={1}
                    />
                  </ImgContainer>
                  <h4>{title?.replace("TIOmarkets:", "")}</h4>
                </ItemVideo>
              );
            })}
          </VideosContainer> */}
        </Section>
        {selectedVideo && (
          <Modal>
            <ModalBG
              onClick={() => {
                // document.body.style.overflow = "";
                setSelectedVideo(null);
              }}
            />
            <ModalContent>
              <iframe
                width="850"
                height="480"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </ModalContent>
          </Modal>
        )}
      </Mcontainer>
    </RightContainer>
  );
};

export default EducationVideosNew;
