import { useCurrentUser } from "./queryHooks";

const useUserFlags = () => {
  const { data } = useCurrentUser();
  const isEmailVerified = data?.flags?.emailVerified;
  const isReceiveDailyEmails = data?.flags?.receiveDailyEmails;
  const isKycApproved = data?.flags?.kycApproved;
  const isDetailsVerified = data?.flags?.detailsVerified;
  const isPhoneVerified = data?.flags?.phoneVerified;
  const kycStatus = data?.flags?.kycStatus;
  const isShariaEnabled = data?.flags?.shariaEnabled;

  return {
    isEmailVerified,
    isReceiveDailyEmails,
    isKycApproved,
    isDetailsVerified,
    isPhoneVerified,
    kycStatus,
    isShariaEnabled,
  };
};

export default useUserFlags;
