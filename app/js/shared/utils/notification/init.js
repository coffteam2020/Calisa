/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import {firebase} from '@react-native-firebase/messaging';
import LogManager from '../logging/LogManager';
import notifee from '@notifee/react-native';

let notificationId = '';
export const notificationInitialize = async (store, currentScreen) => {
  checkPermission();
  registerNotificationInBackground();
  registerWatchingNotificationOpened();
  registerHearingNotification(store, currentScreen);
};

// Request permission
export const requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
  } catch (error) {
    console.log(
      'Err while trying to request permission: ' + error.message || '',
    );
  }
};

// Register token
export const registerToken = async () => {
  const fcmToken = await firebase.messaging().getToken();
  if (fcmToken) {
    console.log('Token FCM: ' + fcmToken);
  }
};

// Check permission
export const checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled && enabled) {
    await registerToken();
  } else {
    await requestPermission();
  }
};

const registerNotificationInBackground = () => {
  firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(
      'onDisplayNotification Background: ' +
        LogManager.parseJsonObjectToJsonString(remoteMessage),
    );
    onDisplayNotification(remoteMessage);
  });
};

// I will handle the navigation if no token valid.
const registerWatchingNotificationOpened = () => {
};
const onDisplayNotification = async (notification) => {
  console.log(
    'onDisplayNotification Background: ' +
      LogManager.parseJsonObjectToJsonString(notification),
  );
  // if (notificationId != notification?.from) {
    notificationId = notification?.from;
  // } else {
  //   return;
  // }
  // Create a channel
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'StayAlone Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title:
      notification?.data?.notification?.title ||
      notification?.notification?.title ||
      notification?.title ||
      'StayAlone',
    body:
      notification?.data?.notification?.body ||
      notification?.notification?.body ||
      notification?.body ||
      'New notification, check it out!',
    android: {
      channelId,
    },
  });
};

const registerHearingNotification = async () => {
  firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log(
      'registerHearingNotification Background: ' +
        LogManager.parseJsonObjectToJsonString(remoteMessage),
    );
    onDisplayNotification(remoteMessage);
  });

  // Handle notification in background - automatically
  firebase.messaging().onMessage((message) => {
    console.log(
      'registerHearingNotification Background: ' +
        LogManager.parseJsonObjectToJsonString(message),
    );
    onDisplayNotification(message);
    backgroundNotificationHandler(message).then();
  });
};

export const backgroundNotificationHandler = async (message) => {
  onDisplayNotification(message);
  return Promise.resolve(message);
};

/**
 * Set badge notifications
 * @param {number} badge set number of badge
 */
export const setBadge = async () => {
  // await notifications.setBadge(Number(badge));
};

/**
 * Reset badge notifications
 * @param {number} badge set number of badge
 */
export async function resetBadge() {
  // await notifications.setBadge(Number(0));
}
