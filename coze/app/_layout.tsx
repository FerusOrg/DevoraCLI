import { Stack } from "expo-router";
import { useAppStore } from "../src/store/useAppStore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { MotiView } from "moti";
import { Text } from "../src/components/Text";
import * as Font from 'expo-font';
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Inter': 'https://rsms.me/inter/font-files/Inter-Regular.woff2?v=3.19',
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setTimeout(() => {
          setIsReady(true);
        }, 2000);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <Text variant="h1" className="text-purple">Coze</Text>
        </MotiView>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0A0A0A' } }}>
        {!hasCompletedOnboarding ? (
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        ) : (
          <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        )}
      </Stack>
    </GestureHandlerRootView>
  );
}
