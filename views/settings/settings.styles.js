import styled from "styled-components";

const SettingMainSec = styled.section`
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryWhite};
  padding: ${({ pall }) => (pall ? pall : "35px 0")};

  &:last-child {
    border-bottom: 0px;
  }
`;
const SettingsRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const ButtonCenter = styled.div`
  display: inline-flex;
`;

const ConfirmationMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const PasswordConfirmation = styled.div``;

export {
  SettingMainSec,
  SettingsRow,
  ButtonCenter,
  ConfirmationMain,
  PasswordConfirmation,
};
