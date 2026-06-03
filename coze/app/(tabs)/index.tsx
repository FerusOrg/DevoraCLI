import { ScrollView, View, Image } from "react-native";
import { Screen } from "../../src/components/Screen";
import { Text } from "../../src/components/Text";
import { Card } from "../../src/components/Card";
import { MotiView } from "moti";
import { Play } from "lucide-react-native";

const RECENT_SCENE = { title: "Midnight Study", category: "Focus", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop" };
const RECOMMENDED = [
  { id: '1', title: "Rain Window", category: "Nature", image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=400&auto=format&fit=crop" },
  { id: '2', title: "Campfire Cabin", category: "Cozy", image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=400&auto=format&fit=crop" },
];

export default function HomeScreen() {
  return (
    <Screen>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-8 pb-4">
          <Text variant="subtext">Good Evening</Text>
          <Text variant="h1" className="mt-1 mb-8">Ready to focus?</Text>

          <Text variant="h3" className="mb-4">Continue Listening</Text>
          <MotiView from={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
            <Card className="p-0 overflow-hidden h-48 relative justify-end">
              <Image source={{ uri: RECENT_SCENE.image }} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.6 }} />
              <View className="absolute top-0 left-0 right-0 bottom-0 bg-black/40" />
              <View className="p-6 flex-row items-end justify-between z-10">
                <View>
                  <Text variant="subtext" className="text-gray-300">{RECENT_SCENE.category}</Text>
                  <Text variant="h2" className="mt-1">{RECENT_SCENE.title}</Text>
                </View>
                <View className="bg-purple rounded-full p-4">
                  <Play size={24} color="white" fill="white" />
                </View>
              </View>
            </Card>
          </MotiView>

          <Text variant="h3" className="mt-10 mb-4">Recommended for you</Text>
          <View className="flex-row justify-between">
            {RECOMMENDED.map((item, i) => (
              <MotiView key={item.id} from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: i * 100, type: "spring" }} style={{ width: '48%' }}>
                <Card className="p-0 overflow-hidden h-56 relative justify-end">
                  <Image source={{ uri: item.image }} style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.7 }} />
                  <View className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <View className="p-4 z-10">
                    <Text variant="subtext" className="text-gray-300 text-xs">{item.category}</Text>
                    <Text className="font-semibold text-lg mt-1">{item.title}</Text>
                  </View>
                </Card>
              </MotiView>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
