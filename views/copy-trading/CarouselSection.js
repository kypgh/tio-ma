import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import CarouselItem from "./CarouselItem";
import { useWindowSize } from "usehooks-ts";
import TemplateItem from "./TemplateItem";
import BecomeProvider from "./BecomeProvider";
import { theme } from "@/styles/theme";

const Container = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: auto;
  position: relative; // this is important
`;
const Title = styled.h2`
  font-size: 28px;

  @media (max-width: 991px) {
    font-size: 22px;
    text-align: center;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  margin: 20px 0;
`;
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
`;

const Btn = styled.button`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* height: 30px; */
  border: 1px solid #d4d4d4;
  border-radius: 5px;
  cursor: pointer;

  & svg {
    align-self: center;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 24px;
  }
`;

const PrevBtn = styled(Btn)`
  margin-right: 10px;
`;

const NextBtn = styled(Btn)`
  margin-left: 10px;
`;

const Carousel = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding-bottom: 20px;
  width: 100%;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const PagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageIndicator = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid #d4d4d4;
  border-radius: 50%;
  background-color: #d4d4d4;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background-color: ${({ isSelected }) =>
    isSelected ? theme.colors.primaryBlue : "transparent"};
`;

const Disclaimer = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const CarouselSection = ({ data, title, hasAccount }) => {
  const ref = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);
  const [page, setPage] = useState(0);
  const { width } = useWindowSize();
  const [isDesktop, setIsDesktop] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemRefs = useRef([]);

  useEffect(() => {
    setItemWidth(ref.current?.children[0]?.getBoundingClientRect().width);
  }, [ref]);
  useEffect(() => {
    setIsDesktop(width > 991);
  }, [width]);

  return (
    <Container>
      {isModalOpen && <BecomeProvider setIsModalOpen={setIsModalOpen} />}

      <Line />
      <Title>{title}</Title>
      <CarouselContainer>
        <PrevBtn
          onClick={() => {
            if (isDesktop) {
              ref.current.scrollLeft = 0;
              setPage(0);
            } else {
              if (itemIndex > 0) {
                const x = itemRefs.current[itemIndex - 1].offsetLeft;
                // Scroll to the element
                ref.current.scrollLeft = x;
                setItemIndex(itemIndex - 1);
              }
            }
          }}
        >
          <MdOutlineKeyboardArrowLeft />
        </PrevBtn>
        <Carousel ref={ref}>
          {data?.items?.map((item, idx) => (
            <CarouselItem
              key={idx}
              data={item}
              ref={(el) => (itemRefs.current[idx] = el)}
            />
          ))}
          {data.items.length < 10 && (
            <TemplateItem
              setIsModalOpen={setIsModalOpen}
              hasAccount={hasAccount}
            />
          )}
        </Carousel>
        <NextBtn
          onClick={() => {
            if (isDesktop) {
              ref.current.scrollLeft = ref.current.scrollWidth;
              setPage(1);
            } else {
              if (itemIndex < itemRefs.current.length - 1) {
                const x = itemRefs.current[itemIndex + 1].offsetLeft;
                // Scroll to the element
                ref.current.scrollLeft = x;
                setItemIndex(itemIndex + 1);
              }
            }
          }}
        >
          <MdOutlineKeyboardArrowRight />
        </NextBtn>
      </CarouselContainer>
      <PagesContainer>
        {data?.items
          ?.filter((_, idx) => (idx + 1) % 5 === 0 || !isDesktop)
          ?.map((item, i) => (
            <PageIndicator
              key={i}
              onClick={() => {
                if (isDesktop) {
                  ref.current.scrollLeft = itemWidth * 5 * i;
                  setPage(i);
                } else {
                  const x = itemRefs.current[i].offsetLeft;
                  // Scroll to the element
                  ref.current.scrollLeft = x;
                  setItemIndex(i);
                }
              }}
              isSelected={isDesktop ? page === i : i === itemIndex}
            />
          ))}
      </PagesContainer>
      <Disclaimer>
        Past performance is not a reliable indicator of future results
      </Disclaimer>
    </Container>
  );
};

export default CarouselSection;
