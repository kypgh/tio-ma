import React, { useEffect, useState } from "react";
import { TitleH1, ParaText } from "../../../components/Typography";
import { AccountMain, OpenLiveAccount, TabContent } from "../myaccount.styles";
import { RightContainer, Dflex } from "../../../styles/sharedstyles";
import { theme } from "../../../styles/theme";
import { useRouter } from "next/router";
import ButtonSecondary from "../../../components/Buttons/ButtonSecondary";
import Input from "../../../components/inputs/Input";
import {
  useGetAllowedAccountTypes,
  useGetUserAccountById,
} from "../../../utils/hooks/queryHooks";
import { useMutation } from "react-query";
import agent from "../../../utils/agent";
import Dropdown from "../../../components/inputs/Dropdown";
import aLinks from "../../../config/aLinks";
import { IoIosArrowBack } from "react-icons/io";
import Mcontainer from "../../../components/Mcontainer";
import SuccessScreen from "../../../components/SuccessScreen";
import AccountSelect from "../../../components/AccountSelect";

export default function EditLeverage({
  pageTranslations,
  genericTranslations,
}) {
  const {
    settingSendRequest,
    editLeverage,
    editLeverageText,
    settingConfirmation,
    settingClose,
    settingResetPassword,
    requestSubmitSuccess,
    account,
    leverage,
    reason: reasonText,
  } = pageTranslations;

  const { successMsgLevarge, success } = genericTranslations;

  const router = useRouter();

  const { data: allowedAccountTypes } = useGetAllowedAccountTypes("live");

  const selectedAccount = router.query.accountId || "";
  const setSelectedAccount = (v) => {
    router.push(
      {
        query: { accountId: v },
      },
      null,
      { shallow: true }
    );
  };

  const [leverageArr, setLeverageArr] = useState([]);
  const [leverageValue, setLeverageValue] = useState("");
  const [reason, setReason] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { data: accountData } = useGetUserAccountById(selectedAccount, {
    enabled: !!selectedAccount,
    initialData: { account: {} },
  });

  const backAccountTab = () => {
    router.push(aLinks.myaccount);
  };

  useEffect(() => {
    if (allowedAccountTypes) {
      setLeverageArr(() =>
        allowedAccountTypes[accountData?.account?.platform]
          ?.find((el) => el.value === accountData?.account?.account_type)
          .leverages?.filter((el) => el !== accountData?.account.leverage)
      );
    }
  }, [accountData]);

  const changeLeverage = useMutation(
    ({ account, leverage, reason }) =>
      agent().changeLeverage({ account, leverage, reason }),
    {
      onSuccess: () => {
        setIsSuccess(true);
      },
    }
  );

  return (
    <>
      <RightContainer>
        {/* <BecomePartnerSlider /> */}
        <Mcontainer bxshadow={theme.colors.primaryBoxShadow} hideRefetch>
          {isSuccess ? (
            <SuccessScreen
              header={success}
              msg={successMsgLevarge}
              onConfirm={() =>
                router.push({
                  pathname: aLinks.myaccount,
                })
              }
            />
          ) : (
            <>
              <AccountMain>
                <TitleH1>{editLeverage}</TitleH1>
                <OpenLiveAccount>
                  <a onClick={backAccountTab}>
                    <IoIosArrowBack size={26} style={{ cursor: "pointer" }} />
                  </a>
                </OpenLiveAccount>
              </AccountMain>
              <TabContent>
                <Dflex column style={{ gap: "25px", marginTop: "50px" }}>
                  <AccountSelect
                    label={account}
                    onChange={(val) => setSelectedAccount(val._id)}
                    width={"300px"}
                    value={selectedAccount}
                  />
                  <Dropdown
                    label={leverage}
                    options={leverageArr?.map((el) => ({
                      label: `1:${el}`,
                      value: el,
                    }))}
                    width={"300px"}
                    onChange={(e) => setLeverageValue(e.target.value)}
                  />
                  <Input
                    label={reasonText}
                    color={theme.colors.mainWhite}
                    width={"300px"}
                    onChange={(e) => setReason(e.target.value)}
                    value={reason}
                  />
                  <ButtonSecondary
                    width={"200px"}
                    onClick={() =>
                      changeLeverage.mutate({
                        account: selectedAccount,
                        leverage: leverageValue,
                        reason: reason,
                      })
                    }
                    disabled={
                      !leverageValue || !reason || changeLeverage.isLoading
                    }
                  >
                    {settingSendRequest}
                  </ButtonSecondary>
                </Dflex>
                <ParaText
                  pmt={"52px"}
                  pmb={"48px"}
                  psize={"16px"}
                  plheight={"19px"}
                  className="border-tp-full"
                >
                  {editLeverageText}
                </ParaText>
              </TabContent>
            </>
          )}
        </Mcontainer>
      </RightContainer>
    </>
  );
}
