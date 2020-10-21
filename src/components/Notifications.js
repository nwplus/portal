

// checks if the browser allowed for notification permission
// if permission is granted, show notification
// if permission is not denied, ask for permission then if permission is granted, show notification
// if permission is denied, do nothing
const checkNotification= (announcement) => {
  if (Notification.permission === "granted") {
    showNotification(announcement);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        showNotification(announcement);
      }
    });
  }
}

// shows notification with content announcement
const showNotification= announcement => {
  var notification = new Notification("nwPlus", { body: announcement});
}


export default Notification


/*
function askNotificationPermission() {
  function handlePermission(permission) {
    if (!("permission" in Notification)) {
      Notification.permission = permission;
    }
  }  
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  } else {
    if (checkNotificationPromise()) {
      Notification.requestPermission().then((permission) => {
        handlePermission(permission);
      })
    } else {
      Notification.requestPermission(function(permission) {
        handlePermission(permission);
      });
    }
  }
}

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch(e) {
    return false;
  }
  return true;
}
*/