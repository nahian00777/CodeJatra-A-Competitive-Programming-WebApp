import React, { useState, useEffect } from "react";

import Notification from "./Notification";

function NotificationContainer({ onAccept, onReject, notifications }) {

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-1 left-2 w-90">
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
