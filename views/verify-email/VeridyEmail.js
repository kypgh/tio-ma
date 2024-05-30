import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainContainer } from "../../styles/sharedstyles";
import { TitleH1, TitleH3 } from "../../components/Typography";
import { theme } from "../../styles/theme";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "react-query";
import agent from "../../utils/agent";
import { setCookies } from "cookies-next";
import aLinks from "../../config/aLinks";
import Loader from "../../components/Loader";
import Input from "../../components/inputs/Input";

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  background-color: ${theme.colors.mainWhite};
  padding: 40px 15px;
  gap: 20px;
  position: relative;
  min-height: 250px;
`;

const ErrorMsg = styled.div`
  color: ${theme.colors.errorMsg};
`;

const VeridyEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState(null);

  const verifyEmail = useMutation((token) => agent().verifyEmail(token), {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      router.push(aLinks.dashboard);
    },
    onError: (err) => {
      setCookies("token", "", { path: "/" });
      setError(err.response.data.message);
      queryClient.invalidateQueries(["currentUser"]);
    },
  });

  useEffect(() => {
    const { emailVerificationToken } = router.query;
    if (emailVerificationToken) {
      verifyEmail.mutate(emailVerificationToken);
    }
  }, [router.query]);

  return (
    <MainContainer>
      <Outer>
        <Loader
          isLoading={verifyEmail.isLoading}
          bgOpacity={0}
          style={{ backdropFilter: "blur(0px)" }}
        />
        <TitleH3 style={{ fontSize: "22px" }}>
          We are verifying your email
        </TitleH3>
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Outer>
    </MainContainer>
  );
};

export default VeridyEmail;
