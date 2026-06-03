import { View, ScrollView } from "react-native";
import { Screen } from "../src/components/Screen";
import { Text } from "../src/components/Text";
import { Button } from "../src/components/Button";
import { Card } from "../src/components/Card";
import { MotiView } from "moti";
import { Check, X } from "lucide-react-native";
import { router } from "expo-router";

const FEATURES = [
  "Offline downloads",
  "Premium environments",
  "AI sound generation",
  "Unlimited saves",
  "No ads"
];

export default function PremiumScreen() {
  return (
    <Screen className="px-6 pt-12 pb-8">
      <View className="flex-row justify-end mb-4">
        <Card interactive onPress={() => router.back()} className="p-2 rounded-full bg-secondary">
          <X size={24} color="#A3A3A3" />
        </Card>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
          <Text variant="h1" className="text-center mb-2">Unlock</Text>
          <Text variant="h1" className="text-center text-purple mb-8">Coze+</Text>

          <View className="mb-10">
            {FEATURES.map((feat, i) => (
              <MotiView key={feat} from={{ opacity: 0, translateX: -20 }} animate={{ opacity: 1, translateX: 0 }} transition={{ delay: i * 100 }}>
                <View className="flex-row items-center mb-4">
                  <View className="bg-purple/20 p-1 rounded-full mr-4">
                    <Check size={16} color="#C4B5FD" />
                  </View>
                  <Text variant="body">{feat}</Text>
                </View>
              </MotiView>
            ))}
          </View>

          <Card className="bg-secondary border border-purple mb-6 py-6 items-center">
            <Text variant="h3" className="mb-1">Yearly</Text>
            <Text variant="h1" className="text-white">$39.99</Text>
            <Text variant="subtext" className="mt-1">Just $3.33 / month</Text>
          </Card>

          <Card className="bg-primary border border-secondary mb-10 py-6 items-center">
            <Text variant="h3" className="mb-1">Monthly</Text>
            <Text variant="h2" className="text-white">$5.99</Text>
          </Card>
        </MotiView>
      </ScrollView>

      <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: 500 }}>
        <Button label="Start 7-Day Free Trial" fullWidth onPress={() => router.back()} />
        <Text variant="subtext" className="text-center mt-4 text-xs">Cancel anytime. Terms & Conditions apply.</Text>
      </MotiView>
    </Screen>
  );
}
