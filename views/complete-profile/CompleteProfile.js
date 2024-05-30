import React, { useEffect, useState } from "react";
import { BsPersonVcard } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineUploadFile, MdPhoneAndroid } from "react-icons/md";
import { RightContainer, Dflex } from "../../styles/sharedstyles";
import Mcontainer from "../../components/Mcontainer";
import LinearBar from "./LinearBar";
import EmailVerification from "./email-verification/EmailVerification";
import InformationVerification from "./information-verification/InformationVerification";
import ClientDocumentsUpload from "./ClientDocuments";
import PhoneVerification from "./phone-verification/PhoneVerification";
import { useCurrentUser } from "../../utils/hooks/queryHooks";
import styled from "styled-components";
import { device } from "../../styles/device";

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;

  @media ${device.mobile} {
    font-size: 18px;
  }
`;

const CompleteProfileNew = ({ pageTranslations }) => {
  const { title, barTitleEmail, barTitleInfo, barTitleDocs } = pageTranslations;
  const { data: currentUser, isLoading } = useCurrentUser();

  const [isEmailCompleted, setIsEmailCompleted] = useState(
    currentUser?.flags?.emailVerified
  );
  const [isInfoCompleted, setIsInfoCompleted] = useState(
    currentUser?.flags?.detailsVerified
  );
  const [isDocCompleted, setIsDocCompleted] = useState(
    currentUser?.flags?.kycStatus === "approved"
  );
  // const [isPhoneCompleted, setIsPhoneCompleted] = useState(
  //   currentUser?.flags?.phoneVerified
  // );

  useEffect(() => {
    setIsEmailCompleted(currentUser?.flags?.emailVerified);
    setIsInfoCompleted(currentUser?.flags?.detailsVerified);
    setIsDocCompleted(currentUser?.flags?.kycStatus === "approved");
    // setIsPhoneCompleted(currentUser?.flags?.phoneVerified);
  }, [currentUser]);

  const steps = [
    {
      title: barTitleEmail,
      icon: <IoMailOutline />,
      component: <EmailVerification pageTranslations={pageTranslations} />,
      isCompleted: isEmailCompleted,
    },
    {
      title: barTitleInfo,
      icon: <BsPersonVcard />,
      component: (
        <InformationVerification pageTranslations={pageTranslations} />
      ),
      isCompleted: isInfoCompleted,
    },
    {
      title: barTitleDocs,
      icon: <MdOutlineUploadFile />,
      component: <ClientDocumentsUpload pageTranslations={pageTranslations} />,
      isCompleted: isDocCompleted,
    },
    // {
    //   title: "Verify Phone Number",
    //   icon: <MdPhoneAndroid />,
    //   component: <PhoneVerification pageTranslations={pageTranslations} />,
    //   isCompleted: isPhoneCompleted,
    // },
  ];
  return (
    <RightContainer>
      <Mcontainer
        hideRefetch
        style={{
          paddingBottom: "50px",
        }}
      >
        <Dflex column style={{ gap: "25px" }}>
          <Title>{title}</Title>
          <LinearBar steps={steps} isLoading={isLoading} />
        </Dflex>
      </Mcontainer>
    </RightContainer>
  );
};

export default CompleteProfileNew;
