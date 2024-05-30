import bonus25 from "@/public/assets/images/adbanners/25bonus.gif";
import educationalVideos from "@/public/assets/images/adbanners/educationalvideos.gif";
import copytrading from "@/public/assets/images/adbanners/copytrading.gif";
import forexDashboard from "@/public/assets/images/adbanners/forexdashboard.gif";
import referAFriend from "@/public/assets/images/adbanners/referafriend.gif";
import tiosignals from "@/public/assets/images/adbanners/tiosignals.gif";
import vip500 from "@/public/assets/images/adbanners/vip500.gif";
import vip1000 from "@/public/assets/images/adbanners/vip1000.gif";

export default {
  "25bonus": {
    banner: bonus25,
    link: "https://tiomarkets.com/forexbonus",
    query: {},
    target: "_blank",
    title: "Trade The Financial Markets With an Extra $25",
  },
  copytrading: {
    banner: copytrading,
    link: "https://tiomarkets.com/copy-trading",
    query: {},
    target: "_blank",
    title: "Level Up With Copy Trading",
  },
  educationalVideos: {
    banner: educationalVideos,
    link: "/trading-tools",
    target: "_self",
    title: "Trading Education Videos Library",
    query: {},
  },
  forexDashboard: {
    banner: forexDashboard,
    link: "/trading-tools",
    query: {
      tab: "dashboard",
    },
    target: "_self",
    title: "Forex Dashboard",
  },
  referAFriend: {
    banner: referAFriend,
    link: "https://tiomarkets.com/refer-a-friend",
    query: {},
    target: "_blank",
    title: "Refer your friends and earn",
  },
  tiosignals: {
    banner: tiosignals,
    link: "https://tiomarkets.com/trading-signals",
    query: {},
    target: "_blank",
    title: "Trading Signals App",
  },
  vip500: {
    banner: vip500,
    link: "https://tiomarkets.com/vip500",
    query: {},
    target: "_blank",
    title: "Upgrade to the VIP Account",
  },
  vip1000: {
    banner: vip1000,
    link: "https://tiomarkets.com/vip1000",
    query: {},
    target: "_blank",
    title: "Upgrade to the VIP Black Account",
  },
};
