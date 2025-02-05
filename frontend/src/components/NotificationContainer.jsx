import React, { useState, useEffect } from "react";

import Notification from "./Notification";

function NotificationContainer({ onAccept, onReject, notifications }) {

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 w-80 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          {...notification}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
}

export default NotificationContainer;
