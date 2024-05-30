import React, { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";
import { useDebounce } from "usehooks-ts";

const Outer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: fit-content;
  margin-left: auto;
  transition: all 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  ${({ disabled }) =>
    !disabled ? "&:hover {transform:  rotateZ(180deg);}" : ""}

  & svg {
    background-color: #fff;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 3px;
    cursor: pointer;
  }
`;

const RefetchQueries = ({ onLoadingStateChange = () => {} }) => {
  const queryClient = useQueryClient();
  const [isWait, setIsWait] = useState(false);
  const debouncedWait = useDebounce(isWait, 2000);

  useEffect(() => {
    if (!debouncedWait) return;
    setIsWait(false);
  }, [debouncedWait]);

  function handleRefetch() {
    if (!isWait && !debouncedWait) {
      onLoadingStateChange(true);
      queryClient
        .invalidateQueries({
          predicate: (q) => q.queryKey[0] !== "currentUser",
        })
        .finally(() => {
          onLoadingStateChange(false);
        });
      setIsWait(true);
    }
  }

  return (
    <Outer onClick={handleRefetch} disabled={isWait || debouncedWait}>
      <BiRefresh size={26} />
    </Outer>
  );
};

export default RefetchQueries;
