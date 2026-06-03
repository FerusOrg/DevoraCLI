import { Redirect } from "expo-router";
import { useAppStore } from "../src/store/useAppStore";

export default function Index() {
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);

  if (hasCompletedOnboarding) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding" />;
}
