import { useQuery, QueryObserverResult, UseQueryOptions } from "react-query";
import { CRYPTO_CURRENCIES } from "../../config/enums";
import agent from "../agent";

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useCurrentUser = (options = {}) => {
  return useQuery(["currentUser"], () => agent().currentUserDetails(), {
    initialData: {},
    ...options,
  });
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetAllowedAccountTypes = (environment_type, options = {}) => {
  return useQuery(
    ["allowedAccountTypes", environment_type],
    () =>
      agent()
        .getAllowedAccountTypes({ environment_type })
        .then((res) => res.data),
    options
  );
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserAccountsWithdrawFormatted = (options = {}) => {
  const res = useGetUserLiveAccounts(options);
  return {
    ...res,
    data: res.data
      ?.filter((x) => !CRYPTO_CURRENCIES.includes(x.currency))
      ?.map((x) => ({
        value: x["_id"],
        name: `${x["platform"]} - ${x["login_id"]} (${x["currency"]} - ${x["balance"]})`,
        isDisabled: x["balance"] == 0,
      })),
  };
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserAccountsDepositFormatted = (options = {}) => {
  const res = useGetUserLiveAccounts(options);
  return {
    ...res,
    data: res.data
      ?.filter((x) => !CRYPTO_CURRENCIES.includes(x.currency))
      ?.map((x) => ({
        value: x["_id"],
        name: `${x["platform"]} - ${x["login_id"]} (${x["currency"]} - ${x["balance"]})`,
      })),
  };
};

/**
 * @param {string} accountId - The id of the account.
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserAccountById = (accountId, options = {}) => {
  return useQuery(
    ["userAccount", accountId],
    () =>
      agent()
        .getUserAccountById({ accountId })
        .then((res) => res.data),
    options
  );
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserLiveAccounts = (options = {}) => {
  return useQuery(
    ["myaccount", "live"],
    () =>
      agent()
        .getUserAccounts({ environment_type: "live" })
        .then((res) => res.data.accounts),
    options
  );
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserDemoAccounts = (options = {}) => {
  return useQuery(
    ["myaccount", "demo"],
    () =>
      agent()
        .getUserAccounts({ environment_type: "demo" })
        .then((res) => res.data.accounts),
    options
  );
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserArchivedAccounts = (options = {}) => {
  return useQuery(
    ["myaccount", "archived"],
    () =>
      agent()
        .getUserAccounts({ environment_type: "live", archived: true })
        .then((res) => res.data.accounts),
    options
  );
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserDocuments = (options = {}) => {
  return useQuery(
    ["userDocuments"],
    () =>
      agent()
        .getUserDocuments()
        .then((res) => res.data),
    options
  );
};

/**
 * @param {string} accountId - The id of the account.
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserAccountHistory = (accountId, options = {}) => {
  return useQuery(
    ["userAccountHistory", accountId],
    () =>
      agent()
        .transactionHistory({ accountId })
        .then((res) => res.data),
    options
  );
};

/**
 * @param {string} accountId - The id of the account.
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetAccountDemographics = (accountId, options = {}) => {
  return useQuery(
    ["userAccountDemographics", accountId],
    () =>
      agent()
        .accountDemographics(accountId)
        .then((res) => res.data),
    options
  );
};

/**
 * @param {string} accountId - The id of the account.
 * @param {'closed' | 'open'} type
 * @param {number} page
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetAccountTrades = (
  accountId,
  type,
  page = 1,
  options = {}
) => {
  return useQuery(
    ["userAccountTrades", accountId, type, page],
    () =>
      agent()
        .accountTrades({ accountId, type, page })
        .then((res) => res.data),
    options
  );
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetAccountSummary = (options = {}) => {
  return useQuery(
    ["userAccountSummary"],
    () =>
      agent()
        .accountSummary()
        .then((res) => res.data),
    options
  );
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetAccountSummaryPositions = (options = {}) => {
  return useQuery(
    ["userAccountSummaryPositions"],
    () =>
      agent()
        .accountSummaryPositions()
        .then((res) => res.data),
    options
  );
};

/**
 * @param {string} from - The id of the account.
 * @param {string} to
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetExchangeRate = (from, to, options = {}) => {
  return useQuery({
    queryKey: ["exchangeRate", from, to],
    queryFn: () =>
      agent()
        .getExchangeRate({
          from,
          to,
        })
        .then((res) => res.data),
    enabled: !!from && !!to,
    ...options,
  });
};

/**
 * @param {string} accountId - The id of the account
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useAccountCryptoDepositQuery = (accountId, options = {}) => {
  return useQuery({
    queryKey: ["bitgo", accountId],
    queryFn: () =>
      agent()
        .getBitgoDepositAddress({
          accountId,
        })
        .then((res) => res.data),
    enabled: !!accountId,
    ...options,
  });
};

/**
 * @param {UseQueryOptions} options - The options for the query.
 * @returns {QueryObserverResult} The result of the query.
 */
export const useGetUserTransactionSummary = (options = {}) => {
  return useQuery(
    ["userTransactionSummary"],
    () =>
      agent()
        .getUserTransactionSummary()
        .then((res) => res.data.summary),
    options
  );
};
