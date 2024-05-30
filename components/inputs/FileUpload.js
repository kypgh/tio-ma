import Image from "next/image";
import React, { useState } from "react";
import { BsFiletypePdf } from "react-icons/bs";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ButtonSecondary from "../Buttons/ButtonSecondary";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: center;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  border: 1px dotted ${theme.colors.slightGrayOne};
  position: relative;
  min-height: 120px;
  width: 100%;
  border-radius: 5px;
  padding-right: 50px;
  padding-left: 5px;
  overflow-x: auto;
`;

const TextAbsolute = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${theme.colors.slightGrayOne};
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 800;
`;

const FileInput = styled.input`
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const FileOuter = styled.div`
  background-color: ${theme.colors.slightGray};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  z-index: 5;
  border-radius: 5px;
  position: relative;
`;

const CloseBtn = styled(AiOutlineCloseCircle)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(35%, 35%);
  cursor: pointer;
  z-index: 10;
  color: ${theme.colors.primaryRed};
  background-color: ${theme.colors.mainWhite};
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0px #ffffff;
`;

const ErrorMsg = styled.div`
  color: ${theme.colors.primaryRed};
  font-size: 14px;
  font-weight: 500;
`;

const SuccessMsg = styled.div`
  color: ${theme.colors.primaryColorGreen};
  font-size: 14px;
  font-weight: 500;
`;

const validImageTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

const FileUpload = ({
  pageTranslations,
  onUpload = () => {},
  isLoading = false,
  children,
}) => {
  const { dropFileText, uploadBtnTxt } = pageTranslations;
  const [files, setFiles] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setShowError(false);
    const fileList = e.target.files;
    const filteredArr = Object.values(fileList).filter((file) =>
      validImageTypes.includes(file.type)
    );
    const removedSomething = filteredArr.length !== fileList.length;
    if (removedSomething) {
      setShowError(true);
    }
    setFiles([...files, ...filteredArr]);
  };

  return (
    <Container
      style={{
        justifyContent: "space-between",
        flex: "1 1 auto",
        gap: "0px",
      }}
    >
      <ImgContainer>
        {!files.length && <TextAbsolute>{dropFileText}</TextAbsolute>}
        <FileInput type="file" multiple onChange={handleChange} />
        {files.map((file, idx) => {
          const isImage = file.type.includes("image");
          const isPdf = file.type.includes("pdf");
          return (
            <FileOuter key={`${file.name}-${idx}`}>
              <CloseBtn
                size={22}
                onClick={() =>
                  setFiles(files.filter((f) => f.name !== file.name))
                }
              />
              {isImage && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  width={80}
                  height={80}
                  style={{ cursor: "default", zIndex: 5 }}
                />
              )}
              {isPdf && <BsFiletypePdf size={80} color={"#F40F02"} />}
            </FileOuter>
          );
        })}
      </ImgContainer>
      {showError && (
        <ErrorMsg>Allowed file types are jpg, jpeg, png and pdf</ErrorMsg>
      )}

      <ButtonSecondary
        style={{}}
        width={200}
        disabled={!files.length || isLoading}
        onClick={() =>
          onUpload(files).then(() => {
            setShowSuccess(true);
            setFiles([]);
          })
        }
      >
        {uploadBtnTxt}
      </ButtonSecondary>
      {children}
      {showSuccess && <SuccessMsg>File uploaded successfully</SuccessMsg>}
    </Container>
  );
};

export default FileUpload;
