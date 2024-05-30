import { getCookie, setCookie } from "cookies-next";
import { getInstance } from "./axiosProvider";
import brand from "../constants/brand";
import regulation from "../constants/entity";
import aLinks from "../config/aLinks";

const setToken = (token) => {
  setCookie("token", token, { sameSite: "lax" });
};
const setRefreshToken = (token) => {
  setCookie("refresh_token", token, { sameSite: "lax" });
};

const removeTokens = () => {
  setCookie("token", "", { sameSite: "lax" });
  setCookie("refresh_token", "", { sameSite: "lax" });
};

/**
 * @return {import("axios").AxiosInstance}
 */
function createServerOrClientAxios(context) {
  if (context) {
    const token = getCookie("token", context);
    const refresh_token = getCookie("refresh_token", context);
    return getInstance(
      token,
      refresh_token,
      (token) => {
        context.res.setHeader("Set-Cookie", [
          `token=${token}; sameSite=lax; path=/;`,
        ]);
      },
      (token) => {
        context.res.setHeader("Set-Cookie", [
          `refresh_token=${token}; sameSite=lax; path=/;`,
        ]);
      }
    );
  } else {
    const token = getCookie("token");
    const refresh_token = getCookie("refresh_token");
    return getInstance(token, refresh_token, setToken, (t) => {
      setRefreshToken(t);
      if (!t) window.location.href = aLinks.index;
    });
  }
}

export default function (context) {
  let axiosInstance = createServerOrClientAxios(context);
  return {
    axiosInstance,
    loginUser: async ({ email, password, entity }) => {
      let res = await axiosInstance.post("/membersArea/auth/login", {
        email,
        password,
        entity: regulation,
        brand,
      });
      setRefreshToken(res.data.accessToken);
      setToken(res.data.jwt);
      return res.data;
    },
    logOutUser: async ({ accessToken }) => {
      return axiosInstance
        .post("/membersArea/auth/logout", { accessToken })
        .then(() => removeTokens())
        .catch((err) => {
          if (err.status === 401) removeTokens();
        });
    },
    currentUserDetailsSSR: async () => {
      return axiosInstance
        .get("/membersArea/user")
        .then((res) => ({ props: { user: res.data.user } }))
        .catch((error) => {
          console.error("current user error", error?.response?.data);
          if (error?.response?.status === 401) {
            return {
              redirect: {
                destination: "/login",
                permanent: false,
              },
            };
          }
          return {
            props: {
              user: null,
              error: error?.response?.data || "Something went wrong",
            },
          };
        });
    },
    currentUserDetails: async () => {
      return axiosInstance
        .get("/membersArea/user")
        .then((res) => res.data.user);
    },
    getUserAccounts: async ({ environment_type, archived = false }) => {
      return axiosInstance.get("/membersArea/accounts", {
        params: { environment_type, archived },
      });
    },
    getUserAccountById: async ({ accountId }) => {
      return axiosInstance.get(`/membersArea/accounts/${accountId}`);
    },
    forgotPassword: async ({ email }) => {
      return axiosInstance.post("/membersArea/auth/forgotPassword", {
        email,
        entity: regulation,
        brand,
      });
    },
    // prettier-ignore
    createTradingAccount: async ({ account_type, platform, currency, leverage, environment_type, }) => {
      return axiosInstance.post("/membersArea/accounts", {
        account_type,
        platform,
        currency,
        leverage,
        environment_type,
      });
    },
    depositToAccount: async ({ accountId }) => {
      return axiosInstance.post(`/membersArea/accounts/${accountId}/deposit`);
    },
    getAllowedAccountTypes: async ({ environment_type }) => {
      return axiosInstance.get("/membersArea/accounts/accountTypes", {
        params: { environment_type },
      });
    },
    accountSummary: async () => {
      return axiosInstance.get(`/membersArea/user/summary`);
    },
    accountSummaryPositions: async () => {
      return axiosInstance.get(`/membersArea/user/summary_positions`);
    },
    withdrawFromAccount: async ({ accountId, body }) => {
      return axiosInstance.post(
        `/membersArea/accounts/${accountId}/withdraw`,
        body
      );
    },
    sendVerificationEmail: async () => {
      return axiosInstance.get("/membersArea/user/verifyEmail");
    },
    verifyEmail: async (verifyEmailToken) => {
      let res = await axiosInstance.post(`/membersArea/auth/verifyEmail`, {
        verifyEmailToken,
      });
      setRefreshToken(res.data.accessToken);
      setToken(res.data.jwt);
      return res.data;
    },
    sendVerificationSMS: async () => {
      return axiosInstance.get("/membersArea/user/verifyPhone");
    },
    verifySMS: async (otp) => {
      return axiosInstance.post(`/membersArea/user/verifyPhone`, {
        otp,
      });
    },
    verifyUserDetails: async (body) => {
      return axiosInstance.post(`/membersArea/user/verifyDetails`, body);
    },
    uploadDocumentPOI: async (file) => {
      const formData = new FormData();
      formData.append("id_document", file);
      return axiosInstance.post(`/membersArea/documents`, formData);
    },
    uploadDocumentPOA: async (file) => {
      const formData = new FormData();
      formData.append("proof_of_address", file);
      return axiosInstance.post(`/membersArea/documents`, formData);
    },
    uploadDocumentOther: async (file) => {
      const formData = new FormData();
      formData.append("other", file);
      return axiosInstance.post(`/membersArea/documents`, formData);
    },
    getUserDocuments: async () => {
      return axiosInstance.get(`/membersArea/documents`);
    },
    changePhoneSendOTP: async (phone) => {
      return axiosInstance.post(`/membersArea/user/phone`, {
        phone,
      });
    },
    changePhoneVerifyOTP: async ({ phone, otp }) => {
      return axiosInstance.put(`/membersArea/user/phone`, {
        phone,
        otp,
      });
    },
    transferFunds: async ({ accountFrom, accountTo, amount }) => {
      return axiosInstance.post(`/membersArea/accounts/transferFunds`, {
        accountFrom,
        accountTo,
        amount,
      });
    },
    transactionHistory: async ({ accountId }) => {
      return axiosInstance.get(
        `/membersArea/accounts/${accountId}/transactions`
      );
    },
    changeLeverage: async ({ account, leverage, reason }) => {
      return axiosInstance.post(`/membersArea/requests/changeLeverage`, {
        account,
        leverage,
        reason,
      });
    },
    resetAccountPassword: async (accountId) => {
      return axiosInstance.post(
        `/membersArea/accounts/${accountId}/resetPassword`
      );
    },
    accountDemographics: async (accountId) => {
      return axiosInstance.get(
        `/membersArea/accounts/${accountId}/demographics`
      );
    },
    accountTrades: async ({ accountId, type = "closed", page = 1 }) => {
      return axiosInstance
        .get(`/membersArea/accounts/${accountId}/trades`, {
          params: { type, page },
        })
        .then((res) => res);
    },
    getExchangeRate: async ({ from, to }) => {
      return axiosInstance.get("/membersArea/utils/exchangeRate", {
        params: { from, to },
      });
    },
    deleteAccountRequest: async ({ account, reason }) => {
      return axiosInstance.post(`/membersArea/requests/deleteAccount`, {
        account,
        reason: reason || "No reason specified",
      });
    },
    getOpenPaydAccountDetails: async ({ accountId }) => {
      return axiosInstance.get(`/membersArea/accounts/${accountId}/openpayd`);
    },
    getBitgoDepositAddress: async ({ accountId }) => {
      return axiosInstance.get(`/membersArea/accounts/${accountId}/bitgo`);
    },
    resetUserPassword: async ({ newPassword, token }) => {
      return axiosInstance.post(`/membersArea/auth/resetPassword`, {
        newPassword,
        token,
      });
    },
    changeUserPassword: async ({ oldPassword, newPassword }) => {
      return axiosInstance.post(`/membersArea/user/change_password`, {
        oldPassword,
        newPassword,
      });
    },
    registerUser: async (body = {}) => {
      return axiosInstance.post(`/membersArea/auth/pre_register`, body);
    },
    registerUserVerify: async (body = {}) => {
      const res = await axiosInstance.post(`/membersArea/auth/register`, body);

      setRefreshToken(res.data.accessToken);
      setToken(res.data.jwt);
      return res.data;
    },
    getUserTransactionSummary: async () => {
      return axiosInstance.get(`/membersArea/user/transactions_summary`);
    },
  };
}
