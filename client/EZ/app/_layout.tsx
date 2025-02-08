import * as SplashScreen from 'expo-splash-screen';
import { Text } from 'react-native';
import 'react-native-reanimated';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return ( <>
  <Text>hello</Text>
  </>
  );
}
