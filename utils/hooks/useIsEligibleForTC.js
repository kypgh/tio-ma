import { useRouter } from "next/router";
import { useGetUserTransactionSummary } from "./queryHooks";
import { PUBLIC_PATHS } from "../../config/enums";

const useIsEligibleForTC = () => {
  const { pathname } = useRouter();
  const { data, isLoading } = useGetUserTransactionSummary({
    enabled: !PUBLIC_PATHS.includes(pathname),
  });
  const isEligible = data?.totalDeposits >= 250;
  return {
    isEligible,
    isLoading,
  };
};

export default useIsEligibleForTC;
