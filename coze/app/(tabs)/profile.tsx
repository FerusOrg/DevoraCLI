import { View, ScrollView } from "react-native";
import { Screen } from "../../src/components/Screen";
import { Text } from "../../src/components/Text";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { Settings, Download, Moon, Star, Sparkles } from "lucide-react-native";
import { router } from "expo-router";

export default function ProfileScreen() {
  return (
    <Screen>
      <ScrollView className="flex-1 px-6 pt-8 pb-4" showsVerticalScrollIndicator={false}>
        <Text variant="h1" className="mb-8">Profile</Text>

        <Card className="bg-gradient-to-r from-purple/20 to-purple/5 border border-purple/30 mb-8 items-center py-8">
          <Sparkles size={32} color="#C4B5FD" className="mb-4" />
          <Text variant="h2" className="mb-2">Get Coze+</Text>
          <Text variant="subtext" className="text-center mb-6 px-4">Unlock AI generation, offline mode, and all premium environments.</Text>
          <Button label="View Plans" variant="outline" onPress={() => router.push("/premium")} />
        </Card>

        <Text variant="h3" className="mb-4">Settings</Text>

        <View className="bg-secondary rounded-2xl mb-8 overflow-hidden">
          <Card interactive onPress={() => router.push("/offline")} className="flex-row items-center p-4 border-b border-primary rounded-none bg-transparent">
            <Download size={20} color="#A3A3A3" className="mr-4" />
            <Text className="flex-1">Offline Downloads</Text>
          </Card>
          <Card interactive className="flex-row items-center p-4 border-b border-primary rounded-none bg-transparent">
            <Star size={20} color="#A3A3A3" className="mr-4" />
            <Text className="flex-1">Favorites</Text>
          </Card>
          <Card interactive className="flex-row items-center p-4 border-b border-primary rounded-none bg-transparent">
            <Moon size={20} color="#A3A3A3" className="mr-4" />
            <Text className="flex-1">Sleep Timer Defaults</Text>
          </Card>
          <Card interactive className="flex-row items-center p-4 rounded-none bg-transparent">
            <Settings size={20} color="#A3A3A3" className="mr-4" />
            <Text className="flex-1">App Settings</Text>
          </Card>
        </View>

        <View className="items-center mb-10">
          <Text variant="subtext" className="text-xs">Coze v1.0.0</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
