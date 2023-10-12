import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Onboarding from "./src/screens/Onboarding";
import Login from "./src/screens/Login";
import SignUp from "./src/screens/SignUp";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";

type RootStackParamList = {
  login: undefined;
  signup: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList>;
import { createStackNavigator } from "@react-navigation/stack";
import SignOut from "./src/screens/SignOut";
import useGetOnboardingStatus from "./hooks/useGetOnboardingStatus";
import Tabs from "./components/Tabs";

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [showHomePage, setShowHomePage] = useState<boolean>(false);
  const { isFirstLaunch } = useGetOnboardingStatus();
  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Rubik: require("./assets/fonts/Rubik-Black.ttf"),
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  const tokenCache = {
    async getToken(key: string) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key: string, value: string) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  if (!fontLoaded) {
    return null; // Return a loading component or nothing until the font is loaded
  }
  if (isFirstLaunch || showHomePage) {
    return <Onboarding setShowHomePage={setShowHomePage} />;
  }
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
    >
      <NavigationContainer>
        <SignedOut>
          <RootStack.Navigator>
            <RootStack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <RootStack.Screen
              name="signup"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </RootStack.Navigator>
        </SignedOut>
        <SignedIn>
          <Tabs />
        </SignedIn>
      </NavigationContainer>
    </ClerkProvider>
  );
}
