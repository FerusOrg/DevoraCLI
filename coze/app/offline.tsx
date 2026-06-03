import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Screen } from "../src/components/Screen";
import { Text } from "../src/components/Text";
import { Card } from "../src/components/Card";
import { Button } from "../src/components/Button";
import { MotiView } from "moti";
import { CloudOff, Download, CheckCircle, Trash2, X } from "lucide-react-native";
import { router } from "expo-router";

const DOWNLOADS = [
  { id: '1', title: "Midnight Study", size: "45 MB", status: "downloaded" },
  { id: '2', title: "Deep Sleep Ocean", size: "62 MB", status: "downloading", progress: 65 },
  { id: '3', title: "Rain Window", size: "38 MB", status: "downloaded" },
];

export default function OfflineScreen() {
  return (
    <Screen className="px-6 pt-12 pb-8">
      <View className="flex-row items-center justify-between mb-8">
        <View className="flex-row items-center">
          <CloudOff size={28} color="#7C3AED" className="mr-3" />
          <Text variant="h1">Offline</Text>
        </View>
        <Card interactive onPress={() => router.back()} className="p-2 rounded-full bg-secondary">
          <X size={24} color="#A3A3A3" />
        </Card>
      </View>

      <Text variant="subtext" className="mb-6">Listen to your downloaded environments anywhere, without an internet connection.</Text>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {DOWNLOADS.map((item, i) => (
          <MotiView key={item.id} from={{ opacity: 0, translateY: 10 }} animate={{ opacity: 1, translateY: 0 }} transition={{ delay: i * 100 }}>
            <Card className="bg-secondary mb-4 p-4 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="font-semibold mb-1">{item.title}</Text>
                <Text variant="subtext" className="text-xs">{item.size}</Text>

                {item.status === 'downloading' && item.progress !== undefined && (
                  <View className="w-full h-1 bg-primary rounded-full mt-3">
                    <View className="h-full bg-purple rounded-full" style={{ width: `${item.progress}%` as any }} />
                  </View>
                )}
              </View>

              <View className="ml-4 flex-row items-center">
                {item.status === 'downloaded' ? (
                  <>
                    <CheckCircle size={20} color="#8B5CF6" className="mr-4" />
                    <Trash2 size={20} color="#EF4444" opacity={0.7} />
                  </>
                ) : (
                  <Text variant="subtext" className="text-xs text-purple">{item.progress}%</Text>
                )}
              </View>
            </Card>
          </MotiView>
        ))}
      </ScrollView>
    </Screen>
  );
}
