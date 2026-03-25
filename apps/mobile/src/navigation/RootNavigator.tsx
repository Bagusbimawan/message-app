import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '@/screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import AppNavigator  from './AppNavigator';

type AppState = 'splash' | 'auth' | 'app';

export default function RootNavigator() {
  // Start at splash, move to auth after animation finishes.
  // When backend auth is ready: check token after splash → 'auth' or 'app'
  const [appState, setAppState] = useState<AppState>('splash');

  if (appState === 'splash') {
    return (
      <SplashScreen onFinish={() => setAppState('auth')} />
    );
  }

  return (
    <NavigationContainer>
      {appState === 'app' ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
