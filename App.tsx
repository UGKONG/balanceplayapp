/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable react/react-in-jsx-scope */
import messaging, {
  type FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import {
  StatusBar,
  useColorScheme,
  AppState,
  AppStateStatus,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import {useDispatch, useSelector} from 'react-redux';
import Navigation from './Navigation';
import type {Store} from './store/index.type';

const message = messaging();

export default function App() {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const getTalk = useSelector((x: Store) => x?.getTalk);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getToken = () => {
    message
      .getToken()
      .then(x => {
        dispatch({type: 'uuid', payload: x});
      })
      .catch(() => {
        dispatch({type: 'uuid', payload: null});
        getToken();
      });
  };

  const register = (callback: () => void): void => {
    message
      .registerDeviceForRemoteMessages()
      .then(() => callback())
      .catch(() => callback());
  };

  // 토큰조회 가능여부 체크
  const remoteCheck = (): void => {
    const bool: boolean = message.isDeviceRegisteredForRemoteMessages;
    if (!bool) return register(getToken);
    getToken();
  };

  // 포그라운드 메시지 처리
  const onMessage = (message: FirebaseMessagingTypes.RemoteMessage) => {
    let body = message?.notification?.body ?? '';
    if (!body || !getTalk) return;

    console.log('메시지 수신', body);
    getTalk();
  };

  // 포/백 그라운드 전환 처리
  const appStatusChangeHandler = (state: AppStateStatus): void => {
    if (state === 'background' || !getTalk) return;
    setTimeout(getTalk, 300);
  };

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      appStatusChangeHandler,
    );
    return () => appStateListener.remove();
  }, [AppState]);
  useEffect(() => remoteCheck(), []);
  useEffect(() => SplashScreen.hide(), []);
  useEffect(() => messaging().onMessage(onMessage), []);

  return (
    <>
      <StatusBar
        barStyle={'default'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Navigation />
    </>
  );
}
