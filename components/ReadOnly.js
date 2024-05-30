import React, { useState } from "react";
import { useNotification } from "./actionNotification/NotificationProvider";
import styled from "styled-components";
import useUserFlags from "../utils/hooks/useUserFlags";
import ButtonPrimary from "./Buttons/ButtonPrimary";
import { useRouter } from "next/router";

const Contents = styled.div`
  display: contents;
`;

const Fixed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  z-index: 1;
`;

const Content = styled.div`
  max-width: 600px;
  width: 100%;
  background-color: #fff;
  padding: 40px 20px;
  border-radius: 10px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;

  & > p {
    text-align: center;
  }
`;

const ReadOnly = ({ children, url }) => {
  const { isEmailVerified } = useUserFlags();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const actionNotification = useNotification();

  const removeEventHandlers = (element, index) => {
    if (Array.isArray(element)) {
      return element.map((el, idx) => removeEventHandlers(el, idx));
    }

    if (React.isValidElement(element)) {
      const { children, ...props } = element.props;
      const clonedChildren = removeEventHandlers(children);

      const clonedElement = React.cloneElement(element, {
        ...props,
        children: clonedChildren,
        onClick: undefined,
        onKeyDown: undefined,
        onSubmit: undefined,
        onKeyPress: undefined,
        onSubmitCapture: undefined,
        onKeyPressCapture: undefined,
        key: index,
      });

      return clonedElement;
    }

    return element;
  };

  if (isEmailVerified) return <>{children}</>;

  const clonedElement = removeEventHandlers(children);

  const router = useRouter();

  return (
    <>
      {isModalOpen && (
        <Fixed>
          <Bg
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
          <Content>
            <p>
              In order to open an account you must first verify your email
              address and complete your profile
            </p>
            <ButtonPrimary
              onClick={() => {
                router.push({
                  pathname: url,
                });
              }}
            >
              Go to complete profile
            </ButtonPrimary>
          </Content>
        </Fixed>
      )}
      <Contents
        style={{ display: "contents" }}
        onClick={() => {
          actionNotification.INFO("Please verify your email", url);
          setIsModalOpen(true);
        }}
      >
        {clonedElement}
      </Contents>
    </>
  );
};

export default ReadOnly;
