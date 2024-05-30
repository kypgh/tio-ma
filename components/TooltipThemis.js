import React, { cloneElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { theme } from "../styles/theme";
import useOnClickAway from "../utils/hooks/useOnClickAway";

const openAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const Outer = styled.div`
  /* display: contents; */
`;

const TooltipSc = styled.div`
  position: absolute;
  /* padding: 4px; */
  background-color: ${({ bgColor }) => bgColor || theme.colors.slightGray};
  border-radius: 3px;
  font-size: small;
  border: 1px solid ${theme.colors.mainBlack};
  width: 200px;
  font-weight: 600;
  animation: ${openAnimation} 0.2s ease-in-out;
`;

const TooltipArrow = styled.div`
  content: "";
  position: absolute;
  height: 8px;
  width: 8px;
  background-color: inherit;
  transform: rotate(45deg) translateY(-1px);
  border-bottom: 1px solid ${theme.colors.mainBlack};
  border-right: 1px solid ${theme.colors.mainBlack};
`;

function calcPos(child, tooltip, position) {
  const childRect = child.children[0].getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const arrowRect = { width: 8, height: 8 };
  const borderRadius = 4;
  const [pos1, pos2] = position.split("-");
  const gap = 4;
  let transfrom = "rotate(45deg) translateY(-1px)";
  let top = childRect.top - tooltipRect.height;
  let left = childRect.left - tooltipRect.width / 2 + childRect.width / 2;
  let arrowTop = tooltipRect.height - arrowRect.height / 2;
  let arrowLeft = tooltipRect.width / 2 - arrowRect.width / 2;
  if (pos1 === "top") {
    top -= gap;
    transfrom = "rotate(45deg) translateY(-1px)";
    if (pos2 === "left") {
      left = childRect.left;
      arrowLeft = borderRadius;
    } else if (pos2 === "right") {
      left = childRect.left - tooltipRect.width + childRect.width;
      arrowLeft = tooltipRect.width - borderRadius - arrowRect.width;
    }
  } else if (pos1 === "bottom") {
    transfrom = "rotate(225deg) translateY(1px)";
    top = childRect.top + childRect.height + gap;
    arrowTop = -arrowRect.height / 2;
    if (pos2 === "left") {
      left = childRect.left;
      arrowLeft = borderRadius;
    } else if (pos2 === "right") {
      left = childRect.left - tooltipRect.width + childRect.width;
      arrowLeft = tooltipRect.width - borderRadius - arrowRect.width;
    }
  } else if (pos1 === "left") {
    transfrom = "rotate(-45deg) translateY(-1px)";
    left = childRect.left - tooltipRect.width - gap;
    top = childRect.top - tooltipRect.height / 2 + childRect.height / 2;
    arrowTop = tooltipRect.height / 2 - arrowRect.height / 2;
    arrowLeft = tooltipRect.width - arrowRect.width / 2;
    if (pos2 === "up") {
      top = childRect.top;
      arrowTop = borderRadius;
    } else if (pos2 === "down") {
      top = childRect.bottom - tooltipRect.height;
      arrowTop = tooltipRect.height - borderRadius - arrowRect.height;
    }
  } else if (pos1 === "right") {
    transfrom = "rotate(-225deg) translateY(1px)";
    left = childRect.left + childRect.width + gap;
    top = childRect.top - tooltipRect.height / 2 + childRect.height / 2;
    arrowTop = tooltipRect.height / 2 - arrowRect.height / 2;
    arrowLeft = -arrowRect.width / 2;
    if (pos2 === "up") {
      top = childRect.top;
      arrowTop = borderRadius;
    } else if (pos2 === "down") {
      top = childRect.bottom - tooltipRect.height;
      arrowTop = tooltipRect.height - borderRadius - arrowRect.height;
    }
  } else {
    throw new Error("Invalid position");
  }

  if (left < 0) left = 0;
  if (top < 0) top = 0;

  let diffLeft = window.innerWidth - (left + tooltipRect.width);
  if (diffLeft < 0) {
    left = left + diffLeft - 20;
    arrowLeft = arrowLeft - diffLeft + 20;
  }

  return {
    top,
    left,
    arrowTop,
    arrowLeft,
    transfrom,
  };
}

/**
 *
 * @param {{
 *  children: React.Component;
 *  content: React.Component | string;
 *  position: "top-left" | "top" | "top-right" | "bottom-left" | "bottom" | "bottom-right" | "left-up" | "left" | "left-down" | "right-up" | "right" | "right-down";
 *  disabled: boolean;
 *  useOnClickInstead: boolean;
 *  bgColor: string;
 *  style: React.CSSProperties
 * }} param0
 * @returns
 */
const Tooltip = ({
  children,
  content,
  position = "top",
  disabled = false,
  useOnClickInstead = false,
  bgColor,
  style,
}) => {
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState(false);

  const childRef = useRef();
  const contentRef = useRef();
  const ref = useRef();

  useEffect(() => {
    if (!temp) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [temp]);

  useOnClickAway(ref, () => setShow(false), [childRef, contentRef]);

  return (
    <Outer ref={ref}>
      <div ref={childRef} style={{ display: "contents" }}>
        {cloneElement(children, {
          ...children.props,
          onMouseEnter: () => {
            if (useOnClickInstead) return;
            setShow(true);
            setTemp(true);
          },
          onMouseLeave: () => {
            if (useOnClickInstead) return;
            setTemp(false);
          },
          onClick: () => {
            if (!useOnClickInstead) return;
            setShow(!show);
          },
        })}
      </div>
      {show &&
        !disabled &&
        createPortal(
          <TooltipSc
            style={{
              padding: `${typeof content === "string" ? "4px" : "0px"}`,
              ...style,
            }}
            bgColor={bgColor}
            onMouseEnter={() => {
              if (useOnClickInstead) return;
              setShow(true);
              setTemp(true);
            }}
            onMouseLeave={() => {
              if (useOnClickInstead) return;
              setShow(false);
            }}
            ref={(r) => {
              if (!r) return;
              let pos = calcPos(childRef.current, r, position);
              r.style.top = pos.top + "px";
              r.style.left = pos.left + "px";
              if (r.children.length > 0) {
                r.children[0].style.top = pos.arrowTop + "px";
                r.children[0].style.left = pos.arrowLeft + "px";
                r.children[0].style.transform = pos.transfrom;
              }
              contentRef.current = r;
            }}
          >
            <TooltipArrow closing={temp} />
            {content}
          </TooltipSc>,
          document.getElementById("tooltipsContainer")
        )}
    </Outer>
  );
};

export default Tooltip;
