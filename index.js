/* eslint-disable curly */
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import useIosPush from './hooks/useIosPush';
import useAndroidPush from './hooks/useAndroidPush';

const OS = Platform.OS;

const popInitialNotification = true;
const requestPermissions = true;
const notificationOptions = {popInitialNotification, requestPermissions};
const channelOptions = {channelId: 'push', channelName: 'push'};

PushNotification.configure(notificationOptions);
PushNotification.createChannel(channelOptions, () => {});

// 백그라운드에서 푸쉬
messaging().setBackgroundMessageHandler(async ({notification}) => {
  const iosPush = useIosPush();
  const androidPush = useAndroidPush();
  if (!notification) return;
  const {title, body} = notification;
  (OS === 'ios' ? iosPush : androidPush)(title, body);
});

AppRegistry.registerComponent(appName, () => App);
