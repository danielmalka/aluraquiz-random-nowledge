import * as React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import shortId from "shortid";
import { AnimatePresence } from "framer-motion";

import Notification from "../Notification";

export const NotifyContext = React.createContext({});

const NotificationsContainer = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  pointer-events: none;
`;

function useCreateDomElement() {
  const [domElement, setDomElement] = React.useState(null);

  React.useEffect(() => {
    const element = document.createElement("div");
    document.body.appendChild(element);
    setDomElement(element);

    return () => document.body.removeChild(element);
  }, []);

  return domElement;
}

function useNotifications() {
  const [notifications, setNotifications] = React.useState([]);

  const notify = React.useCallback(notificationPayload => {
    const id = shortId();

    function removeNotification() {
      setNotifications(notifications => notifications.filter(n => n.id !== id));
    }

    setNotifications(notifications => [
      ...notifications,
      { id, onClose: removeNotification, ...notificationPayload }
    ]);

    setTimeout(removeNotification, 2000);
  }, []);

  return { notify, notifications };
}

function NotificationProvider({ children }) {
  const notificationRoot = useCreateDomElement();

  const { notify, notifications } = useNotifications();
  console.log({ notify, notifications });

  return (
    <>
      <NotifyContext.Provider value={notify}>{children}</NotifyContext.Provider>
      {notificationRoot &&
      createPortal(
        <NotificationsContainer>
          <AnimatePresence>
            {notifications.map(notification => (
              <Notification key={notification.id} {...notification} />
            ))}
          </AnimatePresence>
        </NotificationsContainer>,
        notificationRoot
      )}
    </>
  );
}

export default NotificationProvider;
