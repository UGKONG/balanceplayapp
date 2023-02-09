/* eslint-disable react/react-in-jsx-scope */

import {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './store';
import Navigation from './Navigation';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => SplashScreen.hide(), []);

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={'default'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Navigation />
    </Provider>
  );
}
