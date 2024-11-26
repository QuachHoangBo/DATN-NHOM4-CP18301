import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { LogBox } from "react-native";
import BottomTabBarScreen from "./components/bottomTabBar";
import SearchResultsScreen from "./screens/searchResults/searchResultsScreen";
import AvailableCarsScreen from "./screens/availableCars/availableCarsScreen";
import CarDetailScreen from "./screens/carDetail/carDetailScreen";
import BookingStep1Screen from "./screens/bookingStep1/bookingStep1Screen";
import BookingStep2Screen from "./screens/bookingStep2/bookingStep2Screen";
import BookingStep3Screen from "./screens/bookingStep3/bookingStep3Screen";
import SelectPaymentMethodScreen from "./screens/selectPaymentMethod/selectPaymentMethodScreen";
import ConfirmationScreen from "./screens/confirmation/confirmationScreen";
import ChangeTimeAndLocationScreen from "./screens/changeTimeAndLocation/changeTimeAndLocationScreen";
import BookingSuccessfullScreen from "./screens/bookingSuccessfull/bookingSuccessfullScreen";
import AccountDetailsScreen from "./screens/accountDetails/accountDetailsScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import SavedScreen from "./screens/saved/savedScreen";
import SupportScreen from "./screens/support/supportScreen";
import TermsAndConditionsScreen from "./screens/termsAndConditions/termsAndConditionsScreen";
import FaqsScreen from "./screens/faqs/faqsScreen";
import SplashScreen from "./screens/splashScreen";
import OnboardingScreen from "./screens/onboarding/onboardingScreen";
import LoginScreen from "./screens/auth/loginScreen";
import RegisterScreen from "./screens/auth/registerScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import LocationPickerScreen from "./screens/locations/locationScreen";

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_Regular: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_Medium: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto_Bold: require("./assets/fonts/Roboto-Bold.ttf"),
    Roboto_Black: require("./assets/fonts/Roboto-Black.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="BottomTabBar"
            component={BottomTabBarScreen}
            options={{ ...TransitionPresets.DefaultTransition }}
          />
          <Stack.Screen name="Location" component={LocationPickerScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="AvailableCars" component={AvailableCarsScreen} />
          <Stack.Screen name="CarDetail" component={CarDetailScreen} />
          <Stack.Screen name="BookingStep1" component={BookingStep1Screen} />
          <Stack.Screen name="BookingStep2" component={BookingStep2Screen} />
          <Stack.Screen name="BookingStep3" component={BookingStep3Screen} />
          <Stack.Screen
            name="SelectPaymentMethod"
            component={SelectPaymentMethodScreen}
          />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
          <Stack.Screen
            name="ChangeTimeAndLocation"
            component={ChangeTimeAndLocationScreen}
          />
          <Stack.Screen
            name="BookingSuccessfull"
            component={BookingSuccessfullScreen}
          />
          <Stack.Screen
            name="AccountDetails"
            component={AccountDetailsScreen}
          />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Saved" component={SavedScreen} />
          <Stack.Screen name="Support" component={SupportScreen} />
          <Stack.Screen
            name="TermsAndConditions"
            component={TermsAndConditionsScreen}
          />
          <Stack.Screen name="Faqs" component={FaqsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
