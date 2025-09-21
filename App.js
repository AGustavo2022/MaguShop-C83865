import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Belleza-Regular': require('./assets/fonts/Belleza-Regular.ttf'),
    'JosefinSans-Regular': require('./assets/fonts/JosefinSans-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
        <StatusBar style="light" />
        <MainNavigator />
    </Provider>

  );
}
