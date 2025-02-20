/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useNotificationContext } from "../../contexts/NotificationContext";
import { TfiClose } from "react-icons/tfi";

const Notification = ({ notification }) => {
  const { removeNotification, pauseNotification, resumeNotification } =
    useNotificationContext();
  const timeoutRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    if (!notification.paused) {
      timeoutRef.current = setTimeout(() => {
        removeNotification(notification.id);
      }, notification.remainingTime);
    }

    if (notificationRef.current) {
      setTimeout(() => {
        notificationRef.current.classList.add("pushIn");
      }, 100);
      setTimeout(() => {
        notificationRef.current.classList.remove("pushIn");
      }, 5000);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [
    notification.paused,
    notification.remainingTime,
    removeNotification,
    notification.id,
  ]);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    pauseNotification(notification.id);
  };

  const handleMouseLeave = () => {
    resumeNotification(notification.id);
  };

  const handleClose = () => {
    removeNotification(notification.id);
  };

  return (
    <div
      id={notification.id}
      ref={notificationRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`notification relative font-barlow ${
        notification.type === "success"
          ? "notification-success"
          : notification.type === "error"
          ? "notification-error"
          : notification.type === "information"
          ? "notification-information"
          : ""
      }`}>
      {notification.message}

      <button onClick={handleClose} className="">
        <TfiClose className="absolute w-3 h-3 top-2 right-2" />
      </button>
    </div>
  );
};

export default Notification;
