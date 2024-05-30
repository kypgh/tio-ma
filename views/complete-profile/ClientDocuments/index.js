import React, { useState } from "react";
import {
  ClientDocuments,
  YourProofID,
  ProofId,
  ListUL,
  ListItem,
  Span,
  ParaTextContainer,
  ParaMain,
  NoteSec,
  ProofIdentity,
  MultipleUploadSec,
} from "../ClientDocuments/clientdocuments.styles";
import { theme } from "../../../styles/theme";
import { useMutation, useQueryClient } from "react-query";
import agent from "../../../utils/agent";
import { useGetUserDocuments } from "../../../utils/hooks/queryHooks";
import { DOCUMENTS_STATUS, DOCUMENTS_TYPES } from "../../../config/enums";
import styled from "styled-components";
import Image from "next/image";
import FileUpload from "../../../components/inputs/FileUpload";
import images from "../../../config/images";
import { device } from "../../../styles/device";

const PendingDoc = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.colors.pending};
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ApprovedDoc = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.colors.primaryColorGreen};
  margin-bottom: 10px;
  margin-top: 10px;
`;
const EmptyDoc = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${theme.colors.darkGray};
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.mainBlack};
`;

const P = styled.p`
  font-size: 14px;
  color: ${theme.colors.mainBlack};
  margin: 0;
`;

const UploadContainers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  @media only screen and (max-width: 918px) {
    flex-direction: column;
  }
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  font-size: 18px;
  color: ${theme.colors.mainBlack};
  text-transform: uppercase;
  font-weight: 900;
  opacity: 0.65;
  margin: 20px 0px 0px 0px;
`;

const GenericTitle = styled.h4`
  display: flex;
  align-items: center;
  text-align: left;
  width: 100%;
  font-size: 14px;
  color: ${theme.colors.mainBlack};
  font-weight: 600;
  opacity: 0.65;
  margin: 20px 0px 0px 0px;
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
  z-index: 5;
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
  max-width: 700px;
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
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding-top: 20px;

  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  max-width: 500px;
  height: 700px;
  width: 100%;

  & img {
    object-fit: contain;
  }

  @media ${device.tablet} {
    height: 500px;
  }

  @media ${device.mobile} {
    height: 300px;
  }
`;

export default function ClientDocumentsUpload({ pageTranslations }) {
  const {
    clientDocumentsTitle,
    clientDocumentsMessage1,
    clientDocumentsMessage2,
    yourProofIDTitle,
    yourProofIdList_1,
    yourProofIdList_2,
    proofAddressTitle,
    proofAddressList_1,
    proofAddressList_2,
    yourProofBankingTitle,
    yourProofBankingList_1,
    yourProofBankingList_2,
    yourProofBankingList_3,
    yourProofBankingList_4,
    noteWhenUploadingFilesTile,
    noteWhenUploadingList_1,
    noteWhenUploadingList_2,
    clientPOITitle,
    clientPOATitle,
    clientOnRequestTitle,
    pendingDocText,
    approvedDocText,
  } = pageTranslations;

  const docStatusMessage = {
    [DOCUMENTS_STATUS.pending]: <PendingDoc>{pendingDocText}</PendingDoc>,
    [DOCUMENTS_STATUS.approved]: <ApprovedDoc>{approvedDocText}</ApprovedDoc>,
  };

  const queryClient = useQueryClient();

  const [poiUploaded, setPoiUploaded] = useState(false);
  const [poaUploaded, setPoaUploaded] = useState(false);

  const uploadDocumentPOI = useMutation(
    async (files) => {
      for (const file of files) {
        await agent().uploadDocumentPOI(file);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDocuments");
        setPoiUploaded(true);
      },
    }
  );

  const uploadDocumentPOA = useMutation(
    async (files) => {
      for (const file of files) {
        await agent().uploadDocumentPOA(file);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDocuments");
        setPoaUploaded(true);
      },
    }
  );

  const uploadDocumentOther = useMutation(
    async (files) => {
      for (const file of files) {
        await agent().uploadDocumentOther(file);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userDocuments");
      },
    }
  );

  const { data: userDocs } = useGetUserDocuments();

  return (
    <ClientDocuments>
      {(poiUploaded || poaUploaded) && (
        <Fixed>
          <Bg
            onClick={() => {
              setPoiUploaded(false);
              setPoaUploaded(false);
            }}
          />
          <Content>
            We will review your documents as soon as possible and get back to
            you. In the meantime feel free to continue exploring the rest of
            your client area
          </Content>
        </Fixed>
      )}
      <SectionTitle>{clientDocumentsTitle}</SectionTitle>
      <P>
        {clientDocumentsMessage1}
        <br /> {clientDocumentsMessage2}
      </P>
      <YourProofID>
        <SectionTitle>{yourProofIDTitle}</SectionTitle>
        <ListUL>
          <ListItem>
            <P>{yourProofIdList_1}</P>
          </ListItem>
          <ListItem>
            <P>{yourProofIdList_2}</P>
          </ListItem>
        </ListUL>
        <ImageContainer>
          <ImgWrapper>
            <Image
              src={images.idExample1.src}
              alt={images.idExample1.alt}
              fill
            />
          </ImgWrapper>
          <ImgWrapper>
            <Image
              src={images.idExample2.src}
              alt={images.idExample2.alt}
              fill
            />
          </ImgWrapper>
        </ImageContainer>
      </YourProofID>
      <YourProofID>
        <SectionTitle>{proofAddressTitle}</SectionTitle>
        <ListUL>
          <ListItem>
            <P>{proofAddressList_1}</P>
          </ListItem>
          <ListItem>
            <P>{proofAddressList_2}</P>
          </ListItem>
        </ListUL>
        <ImageContainer>
          <ImgWrapper>
            <Image
              src={images.bankExample1.src}
              alt={images.bankExample1.alt}
              fill
            />
          </ImgWrapper>
          <ImgWrapper>
            <Image
              src={images.bankExample2.src}
              alt={images.bankExample2.alt}
              fill
            />
          </ImgWrapper>
        </ImageContainer>
      </YourProofID>
      <YourProofID>
        <SectionTitle>
          {yourProofBankingTitle} <Span spl={"3px"}>*</Span>
        </SectionTitle>
        <ListUL>
          <ListItem>
            <P>{yourProofBankingList_1}</P>
          </ListItem>
          <ListItem>
            <P>{yourProofBankingList_2}</P>
          </ListItem>
        </ListUL>

        <UploadContainers>
          <ProofIdentity>
            <Title>{clientPOITitle}</Title>
            <MultipleUploadSec>
              <FileUpload
                pageTranslations={pageTranslations}
                onUpload={async (files) => {
                  uploadDocumentPOI.mutate(files);
                }}
                isLoading={uploadDocumentPOI.isLoading}
              >
                {
                  docStatusMessage[
                    userDocs?.documents?.find(
                      (el) => el.document_type === DOCUMENTS_TYPES.poi
                    )?.status
                  ]
                }
              </FileUpload>
            </MultipleUploadSec>
          </ProofIdentity>
          <ProofIdentity>
            <Title>{clientPOATitle}</Title>

            <MultipleUploadSec>
              <FileUpload
                pageTranslations={pageTranslations}
                onUpload={async (files) => {
                  uploadDocumentPOA.mutate(files);
                }}
                isLoading={uploadDocumentPOA.isLoading}
              >
                {
                  docStatusMessage[
                    userDocs?.documents?.find(
                      (el) => el.document_type === DOCUMENTS_TYPES.poa
                    )?.status
                  ]
                }
              </FileUpload>
            </MultipleUploadSec>
          </ProofIdentity>
          <ProofIdentity>
            <Title>{clientOnRequestTitle}</Title>
            <MultipleUploadSec>
              <FileUpload
                pageTranslations={pageTranslations}
                onUpload={async (files) => {
                  uploadDocumentOther.mutate(files);
                }}
                isLoading={uploadDocumentOther.isLoading}
              ></FileUpload>
            </MultipleUploadSec>
          </ProofIdentity>
        </UploadContainers>
        <NoteSec>
          <GenericTitle>{noteWhenUploadingFilesTile}</GenericTitle>
          <ListUL>
            <ListItem>
              <P>{noteWhenUploadingList_1}</P>
            </ListItem>
            <ListItem>
              <P>{noteWhenUploadingList_2}</P>
            </ListItem>
          </ListUL>
        </NoteSec>
        <ParaTextContainer className="d-flex">
          <ParaMain>
            <Span spr={"4px"}>*</Span>
            {yourProofBankingList_3}
            {yourProofBankingList_4}
          </ParaMain>
        </ParaTextContainer>
      </YourProofID>
    </ClientDocuments>
  );
}
