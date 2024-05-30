import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import genUid from "light-uid";
import {
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaExclamation,
} from "react-icons/fa";
import { theme } from "../../styles/theme";
import Link from "next/link";

const NotificationContext = createContext();
const LIFETIME = 4000;

const NOTIFICATION_ICON = {
  success: <FaCheck color={theme.colors.successMsg} />,
  error: <FaTimes color={theme.colors.errorMsg} />,
  warning: <FaExclamationTriangle color={theme.colors.warningMsg} />,
  info: <FaExclamation color={theme.colors.infoMsg} />,
};
const NOTIFICATION_COLORS = {
  success: theme.colors.success,
  error: theme.colors.error,
  warning: theme.colors.warning,
  info: theme.colors.info,
};
const MSG_COLORS = {
  success: theme.colors.successMsg,
  error: theme.colors.errorMsg,
  warning: theme.colors.warningMsg,
  info: theme.colors.infoMsg,
};

const NotificationsContainer = styled.div`
  position: fixed;
  right: 0px;
  top: 10px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const NotificationInstance = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${({ type }) => NOTIFICATION_COLORS[type]};
  padding: 7px;
  border-radius: 7px 0px 0px 7px;
  color: ${({ type }) => MSG_COLORS[type]};
  box-shadow: 3px 3px 10px #0f1216, -3px -3px 10px #0f1418;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 0px;
  margin-bottom: 10px;
`;

const IconDiv = styled.div`
  margin-right: 5px;
  color: ${({ type }) => NOTIFICATION_COLORS[type]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p``;

const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};

const Notification = ({ children, clearSelf, type, url }) => {
  let [timoutSet, setTimeoutSet] = useState(false);
  useEffect(() => {
    if (!timoutSet) {
      setTimeout(() => {
        clearSelf();
      }, LIFETIME);
      setTimeoutSet(true);
    }
  }, []);

  return (
    <NotificationInstance
      as={!url && "div"}
      type={type}
      href={{ pathname: url }}
    >
      <IconDiv type={type}>{NOTIFICATION_ICON[type]}</IconDiv>
      <Text>{children}</Text>
    </NotificationInstance>
  );
};

export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState({});
  return (
    <NotificationContext.Provider value={[notifications, setNotifications]}>
      {children}
      <NotificationsContainer>
        <AnimatePresence mode="popLayout">
          {Object.entries(notifications).map(
            ([_id, { text, type, url }], i) => (
              <motion.div
                layout
                initial={{ translateX: "450px", opacity: 0 }}
                animate={{ translateX: "20px", opacity: 1 }}
                exit={{ translateX: "450px", opacity: 0 }}
                transition={{ type: "spring", stiffness: 1000, damping: 100 }}
                key={_id}
              >
                <Notification
                  type={type}
                  url={url}
                  clearSelf={() =>
                    setNotifications((v) => {
                      delete v[_id];
                      return { ...v };
                    })
                  }
                >
                  {text}
                </Notification>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </NotificationsContainer>
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const [notifications, setNotifications] = useContext(NotificationContext);
  return {
    SUCCESS: (notification, url) => {
      const _id = genUid();
      setNotifications((v) => ({
        ...v,
        [_id]: { url, text: notification, type: NOTIFICATION_TYPE.SUCCESS },
      }));
    },
    ERROR: (notification, url) => {
      const _id = genUid();
      setNotifications((v) => ({
        ...v,
        [_id]: { url, text: notification, type: NOTIFICATION_TYPE.ERROR },
      }));
    },
    WARNING: (notification, url) => {
      const _id = genUid();
      setNotifications((v) => ({
        ...v,
        [_id]: { url, text: notification, type: NOTIFICATION_TYPE.WARNING },
      }));
    },
    INFO: (notification, url) => {
      const _id = genUid();
      setNotifications((v) => ({
        ...v,
        [_id]: { url, text: notification, type: NOTIFICATION_TYPE.INFO },
      }));
    },
  };
}
