import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import ProgressBar from "./ProgressBar";
import EmailVerification from "./email-verification/EmailVerification";
import PhoneVerification from "./phone-verification/PhoneVerification";
import InformationVerification from "./information-verification/InformationVerification";
import ClientDocumentsUpload from "./ClientDocuments";
import TabAnimation from "../../components/TabAnimation";
import { IoMailOutline } from "react-icons/io5";
import { MdPhoneAndroid, MdOutlineUploadFile } from "react-icons/md";
import { BsPersonVcard } from "react-icons/bs";
import {
  useCurrentUser,
  useGetUserDocuments,
} from "../../utils/hooks/queryHooks";
import { DOCUMENTS_STATUS } from "../../config/enums";

const PageContainer = styled.div``;

const FormContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  background-color: ${theme.colors.mainWhite};
  border-radius: 5px;
  padding: 20px 15px;
  min-height: 500px;
`;

const CompleteProfileNew = ({ pageTranslations }) => {
  const {
    verifyEmailTabName,
    verifyPhoneTabName,
    verifyInformationTabName,
    uploadDocumentsTabName,
  } = pageTranslations;
  const [activeScreen, setActiveScreen] = useState(1);
  const { data: currentUser } = useCurrentUser();
  const { data: userDocs } = useGetUserDocuments();

  const [emailCompletion, setEmailCompletion] = useState(
    currentUser?.flags?.emailVerified ? 100 : 0
  );
  const [phoneCompletion, setPhoneCompletion] = useState(
    currentUser?.flags?.phoneVerified ? 100 : 0
  );
  const [infoCompletion, setInfoCompletion] = useState(
    currentUser?.flags?.detailsVerified ? 100 : 0
  );
  const docCompletion = useMemo(
    () =>
      (userDocs?.documents?.reduce(
        (acc, curr) =>
          curr.status.toLowerCase() === DOCUMENTS_STATUS.approved
            ? acc + 1
            : acc,
        0
      ) /
        2) *
      100,
    [userDocs]
  );

  useEffect(() => {
    setEmailCompletion(currentUser?.flags?.emailVerified ? 100 : 0);
    setPhoneCompletion(currentUser?.flags?.phoneVerified ? 100 : 0);
    setInfoCompletion(currentUser?.flags?.detailsVerified ? 100 : 0);
  }, [currentUser]);

  const steps = [
    {
      label: verifyEmailTabName,
      Icon: (
        <IoMailOutline
          size={30}
          style={{
            zIndex: 10,
          }}
        />
      ),
      completion: emailCompletion,
    },
    {
      label: verifyPhoneTabName,
      Icon: (
        <MdPhoneAndroid
          size={30}
          style={{
            zIndex: 10,
          }}
        />
      ),
      completion: phoneCompletion,
    },
    {
      label: verifyInformationTabName,
      Icon: (
        <BsPersonVcard
          size={30}
          style={{
            zIndex: 10,
          }}
        />
      ),
      completion: infoCompletion,
    },
    {
      label: uploadDocumentsTabName,
      Icon: (
        <MdOutlineUploadFile
          size={30}
          style={{
            zIndex: 10,
          }}
        />
      ),
      completion: docCompletion,
    },
  ];

  return (
    <PageContainer>
      <ProgressBar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        steps={steps}
      />
      <TabAnimation isMounted={activeScreen === 1}>
        <FormContainer>
          <EmailVerification
            setEmailCompletion={setEmailCompletion}
            pageTranslations={pageTranslations}
          />
        </FormContainer>
      </TabAnimation>
      <TabAnimation isMounted={activeScreen === 2}>
        <FormContainer>
          <PhoneVerification
            setPhoneCompletion={setPhoneCompletion}
            pageTranslations={pageTranslations}
          />
        </FormContainer>
      </TabAnimation>
      <TabAnimation isMounted={activeScreen === 3}>
        <FormContainer>
          <InformationVerification
            setInfoCompletion={setInfoCompletion}
            pageTranslations={pageTranslations}
          />
        </FormContainer>
      </TabAnimation>
      <TabAnimation isMounted={activeScreen === 4}>
        <FormContainer>
          <ClientDocumentsUpload pageTranslations={pageTranslations} />
        </FormContainer>
      </TabAnimation>
    </PageContainer>
  );
};

export default CompleteProfileNew;
