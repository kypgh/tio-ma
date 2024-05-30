import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import useOnClickAway from "../utils/hooks/useOnClickAway";

const DropdownIn = keyframes`
  0% {
    /* transform: scaleY(0); */
    opacity: 0;
  }
  100% {
    /* transform: scaleY(1); */
    opacity: 1;
  }
`;

const DropdownOuter = styled.div`
  position: relative;
  width: fit-content;
  margin: auto;
`;

const DropdownContainer = styled.div`
  position: fixed;
  width: fit-content;
  z-index: 1000;
  transform-origin: top;
  animation: ${DropdownIn} 0.2s ease forwards;

  & > * {
    width: max-content;
    z-index: 1000;
  }
`;

/**
 *
 * @component
 * @param {Object} props - The component props.
 * @param {'left' | 'right'} props.positionX
 * @param {'top' | 'bottom'} props.positionY
 * @param { React.Component } props.dropdownComponent
 * @returns
 */
const MoreOptions = ({ children, dropdownComponent, positionX, positionY }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const ref = useRef();
  const dropdownRef = useRef();

  useOnClickAway(ref, () => setIsOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      if (positionX === "left")
        setLeft(
          left -
            dropdownRef.current.getBoundingClientRect().width +
            ref.current.getBoundingClientRect().width
        );
      if (positionY === "top")
        setTop(
          top -
            dropdownRef.current.getBoundingClientRect().height -
            ref.current.getBoundingClientRect().height
        );
    }
  }, [isOpen]);

  return (
    <DropdownOuter ref={ref}>
      <div
        style={{ display: "contents" }}
        onClick={(e) => {
          setLeft(e.target.getBoundingClientRect().left);
          setTop(e.target.getBoundingClientRect().bottom);
          setIsOpen(!isOpen);
        }}
      >
        {children}
      </div>
      {isOpen && (
        <DropdownContainer ref={dropdownRef} style={{ left: left, top: top }}>
          {dropdownComponent}
        </DropdownContainer>
      )}
    </DropdownOuter>
  );
};

export default MoreOptions;
