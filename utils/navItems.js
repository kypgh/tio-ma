import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { TiDownloadOutline } from "react-icons/ti";
import { AiOutlineDashboard, AiTwotoneTool } from "react-icons/ai";
import { HiChartSquareBar, HiOutlineClipboardCopy } from "react-icons/hi";
import { RiFundsBoxLine } from "react-icons/ri";
import aLinks from "../config/aLinks";

export const getNavItems = (
  genericTranslations = {},
  { isEligible = false }
) => {
  const {
    navDashboard,
    navAccounts,
    navFunds,
    navCopyTrading,
    navDownload,
    navTradingTools,
    navPerformance,
  } = genericTranslations;

  const tradingCentral = {
    name: "Trading Central",
    icon: <HiChartSquareBar />,
    url: aLinks.tradingCentral,
  };
  return [
    {
      name: navDashboard,
      icon: <MdDashboard />,
      url: aLinks.dashboard,
    },
    {
      name: navAccounts,
      icon: <MdAccountCircle />,
      url: aLinks.myaccount,
    },
    {
      name: navFunds,
      icon: <RiFundsBoxLine />,
      url: aLinks.funds,
    },

    {
      name: navCopyTrading,
      icon: <HiOutlineClipboardCopy />,
      url: aLinks.copyTrading,
    },
    {
      name: navDownload,
      icon: <TiDownloadOutline />,
      url: aLinks.downloadCenter,
    },
    ...(isEligible ? [tradingCentral] : []),
    {
      name: navTradingTools,
      icon: <AiTwotoneTool />,
      url: aLinks.tradingTools,
    },
    {
      name: navPerformance,
      icon: <AiOutlineDashboard />,
      url: aLinks.performance,
    },
  ];
};
