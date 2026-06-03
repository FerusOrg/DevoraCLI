import { useState } from "react";
import { View, ScrollView } from "react-native";
import { router } from "expo-router";
import { MotiView } from "moti";
import { Screen } from "../src/components/Screen";
import { Text } from "../src/components/Text";
import { Button } from "../src/components/Button";
import { Card } from "../src/components/Card";
import { useAppStore } from "../src/store/useAppStore";

const GOALS = [
  "Better sleep",
  "Focus",
  "Reading",
  "Coding",
  "Relaxation",
  "Anxiety relief"
];

export default function OnboardingScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const completeOnboarding = useAppStore(state => state.completeOnboarding);

  const toggleGoal = (goal: string) => {
    setSelected(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const handleContinue = () => {
    completeOnboarding(selected);
    router.replace("/(tabs)");
  };

  return (
    <Screen className="px-6 pt-12 pb-8">
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        className="flex-1"
      >
        <Text variant="h1" className="mb-2">What brings you here?</Text>
        <Text variant="subtext" className="mb-10">Select your goals to personalize your cozy experience.</Text>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap gap-4">
            {GOALS.map((goal, index) => {
              const isSelected = selected.includes(goal);
              return (
                <MotiView
                  key={goal}
                  from={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 100, type: "spring" }}
                  style={{ width: "47%" }}
                >
                  <Card
                    interactive
                    onPress={() => toggleGoal(goal)}
                    className={`items-center justify-center py-8 ${isSelected ? "bg-purple/20 border border-purple" : "bg-secondary border border-transparent"}`}
                  >
                    <Text className={`text-center font-medium ${isSelected ? "text-highlight" : "text-white"}`}>{goal}</Text>
                  </Card>
                </MotiView>
              );
            })}
          </View>
        </ScrollView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: 600, type: "spring" }}
          className="pt-6"
        >
          <Button
            label="Continue"
            fullWidth
            onPress={handleContinue}
            disabled={selected.length === 0}
            style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
          />
        </MotiView>
      </MotiView>
    </Screen>
  );
}
