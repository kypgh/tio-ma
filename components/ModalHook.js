import React, { useEffect } from "react";
import styled from "styled-components";

import useModal from "../utils/hooks/useModal";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;

  //overwrites the Cell component styles
  word-break: initial;
  font-size: 16px;
`;

const ModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

/**
 *
 * @param {{ children: ({ openModal: Function }) => JSX.Element, onConfirm: Function, onReject: Function, onCloseModal: Function, componentToShow: ({ onConfirm: Function, onReject: Function, closeModal: Function }) => JSX.Element}} param0
 * @returns {JSX.Element}
 */
function ModalHook({
  children,
  onConfirm,
  onReject,
  componentToShow,
  onCloseModal = () => null,
}) {
  const { isOpen, openModal, closeModal, data } = useModal({
    onClose: onCloseModal,
  });

  if (isOpen)
    return (
      <>
        {children({ openModal })}
        <Modal>
          <ModalBg onClick={closeModal} />
          {React.cloneElement(componentToShow, {
            onConfirm,
            onReject,
            closeModal,
            modalData: data,
            isOpen,
          })}
        </Modal>
      </>
    );
  return children({ openModal });
}

export default ModalHook;
