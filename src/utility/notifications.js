import icon from '../assets/notification-icon.ico'
import { NOTIFICATION_SETTINGS_CACHE_KEY, NOTIFICATION_PERMISSIONS } from './Constants'

const requestPermission = (permissionCallback) => {
  if (checkNotificationPromise()) {
    Notification.requestPermission().then(permissionCallback)
  } else {
    Notification.requestPermission(permissionCallback)
  }
}

// need this for safari support
const checkNotificationPromise = () => {
  try {
    Notification.requestPermission().then()
  } catch (e) {
    return false
  }
  return true
}

const isCurrentPermission = (permission) => {
  return Notification.permission === permission
}

const areEnabled = () => {
  const settingsJSON = localStorage.getItem(NOTIFICATION_SETTINGS_CACHE_KEY)
  const settings = settingsJSON ? JSON.parse(settingsJSON) : null
  return (
    settings &&
    settings.notificationsEnabled === true &&
    Notification.permission === NOTIFICATION_PERMISSIONS.GRANTED
  )
}

const trigger = (title, body) => {
  new Notification(title, { body, icon })
}

export default {
  requestPermission,
  isCurrentPermission,
  areEnabled,
  trigger,
}
