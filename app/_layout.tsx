import i18next from "@/locales/i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { I18nextProvider } from "react-i18next";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

import DefaultTheme from "@/theme/index";
import { MenuProvider } from "react-native-popup-menu";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  const [fontsLoaded, fontError] = useFonts({
    "Scandia-Bold": require("../assets/fonts/Scandia-Bold.ttf"),
    "Scandia-Light": require("../assets/fonts/Scandia-Light.ttf"),
    "Scandia-Medium": require("../assets/fonts/Scandia-Medium.ttf"),
    "Scandia-MediumItalic": require("../assets/fonts/Scandia-MediumItalic.ttf"),
    "Scandia-Regular": require("../assets/fonts/Scandia-Regular.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider theme={DefaultTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <MenuProvider>
            <QueryClientProvider client={queryClient}>
              <I18nextProvider i18n={i18next}>
                <Stack>
                  <Stack.Screen
                    name="(screens)"
                    options={{ headerShown: false }}
                  />
                </Stack>
                <Toast topOffset={insets.top + 10} />
              </I18nextProvider>
            </QueryClientProvider>
          </MenuProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
