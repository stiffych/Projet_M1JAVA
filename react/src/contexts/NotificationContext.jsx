import React, {
  createContext, // Creates a context object
  useContext, // Hook to use the context
  useState, // Hook to manage state
  useEffect, // Hook to perform side effects
  useRef, // Hook to persist values across renders
} from "react";

// Create a context for notifications
const NotificationContext = createContext();

// Notification provider component
export const NotificationProvider = () => {
  const [notifications, setNotifications] = useState([]); // State to store notifications
  const timeoutsRef = useRef({}); // Reference to store timeout IDs

  // Effect to clean up timeouts when the component unmounts
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  // Function to add a notification
  const addNotification = (message, type = "info", timeout = 6000) => {
    const id = Date.now(); // Unique ID based on current time
    const newNotification = {
      id,
      message,
      type,
      startTime: Date.now(),
      remainingTime: timeout,
      paused: false,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    // Set a timeout to remove the notification after the specified time
    timeoutsRef.current[id] = setTimeout(() => {
      removeNotification(id);
    }, timeout);

    return newNotification.id;
  };

  // Function to remove a notification
  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
    clearTimeout(timeoutsRef.current[id]); // Clear the timeout
    delete timeoutsRef.current[id]; // Remove the timeout reference
  };

  // Function to pause a notification
  const pauseNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id
          ? {
              ...notif,
              paused: true,
              remainingTime:
                notif.remainingTime - (Date.now() - notif.startTime),
            }
          : notif
      )
    );
    clearTimeout(timeoutsRef.current[id]); // Clear the timeout
  };

  // Function to resume a paused notification
  const resumeNotification = (id) => {
    const notification = notifications.find((notif) => notif.id === id);
    if (notification) {
      notification.startTime = Date.now();
      timeoutsRef.current[id] = setTimeout(() => {
        removeNotification(id);
      }, notification.remainingTime);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === id ? { ...notif, paused: false } : notif
        )
      );
    }
  };

  // Provide the context values to children components
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        pauseNotification,
        resumeNotification,
      }}></NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotificationContext = () => useContext(NotificationContext);
