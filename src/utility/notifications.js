import { NOTIFICATION_SETTINGS_CACHE_KEY, NOTIFICATION_PERMISSIONS } from "./Constants";

const requestPermission = (permissionCallback) => {
  if (checkNotificationPromise()) {
    Notification.requestPermission().then(permissionCallback)
  } else {
    Notification.requestPermission(permissionCallback);
  }
}

// need this for safari support
const checkNotificationPromise = () => {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }
  return true;
}

const getCurrentPermission = () => {
  return Notification.permission
}

const isCurrentPermission = (permission) => {
  return getCurrentPermission() === permission;
}

const areEnabled = () => {
  const settingsJSON = localStorage.getItem(NOTIFICATION_SETTINGS_CACHE_KEY)
  const settings = settingsJSON ? JSON.parse(settingsJSON) : null;
  return settings
    && settings.notificationsEnabled === true
    && getCurrentPermission() === NOTIFICATION_PERMISSIONS.GRANTED
}

const trigger = (content) => {
  new Notification(content)
}

export default {
  requestPermission,
  getCurrentPermission,
  isCurrentPermission,
  areEnabled,
  trigger
}