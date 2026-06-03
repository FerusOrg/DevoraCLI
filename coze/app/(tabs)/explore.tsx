import { useState } from "react";
import { ScrollView, View, TextInput, ActivityIndicator } from "react-native";
import { Screen } from "../../src/components/Screen";
import { Text } from "../../src/components/Text";
import { Card } from "../../src/components/Card";
import { Button } from "../../src/components/Button";
import { MotiView } from "moti";
import { Search, Sparkles } from "lucide-react-native";
import { audioService } from "../../src/services/AudioService";
import { router } from "expo-router";

const CATEGORIES = ["Nature", "Cozy", "Sleep", "Focus", "Anxiety"];

export default function ExploreScreen() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMix, setGeneratedMix] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);

    // In a real app, this would be an API call to OpenAI/Gemini
    // e.g. await fetch('https://api.openai.com/v1/chat/completions', { ... })
    // For this milestone, we use a complex simulated response based on the prompt

    setTimeout(() => {
      let layers = [];
      if (prompt.toLowerCase().includes("rain")) {
        layers.push({ name: "Heavy Rain", vol: "70%", key: "rain", val: 0.7 });
      } else {
        layers.push({ name: "Light Rain", vol: "30%", key: "rain", val: 0.3 });
      }

      if (prompt.toLowerCase().includes("cozy") || prompt.toLowerCase().includes("fire")) {
        layers.push({ name: "Campfire", vol: "50%", key: "fire", val: 0.5 });
      } else {
        layers.push({ name: "Distant Fire", vol: "10%", key: "fire", val: 0.1 });
      }

      layers.push({ name: "Soft Wind", vol: "20%", key: "wind", val: 0.2 });

      setGeneratedMix({
        title: "AI Generated: " + prompt,
        layers
      });
      setIsGenerating(false);
      setPrompt("");
    }, 2000);
  };

  const playGeneratedMix = async () => {
    if (!generatedMix) return;

    // Unload current, load new mix layers
    await audioService.unloadAll();

    const assets = {
      rain: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      fire: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      wind: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    } as any;

    for (const layer of generatedMix.layers) {
      if (assets[layer.key]) {
        await audioService.loadLayer(layer.key, assets[layer.key], layer.val);
      }
    }

    router.push("/(tabs)/player");
  };

  return (
    <Screen>
      <ScrollView className="flex-1 px-6 pt-8 pb-4" showsVerticalScrollIndicator={false}>
        <Text variant="h1" className="mb-6">Explore</Text>

        <View className="flex-row items-center bg-secondary rounded-2xl px-4 py-3 mb-8">
          <Search size={20} color="#A3A3A3" />
          <TextInput
            placeholder="Search environments, sounds..."
            placeholderTextColor="#A3A3A3"
            className="flex-1 ml-3 text-white font-inter text-base"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-10 overflow-visible">
          {CATEGORIES.map((cat, i) => (
            <MotiView key={cat} from={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 50, type: "spring" }}>
              <Card interactive className="mr-3 py-3 px-6 rounded-full bg-secondary">
                <Text>{cat}</Text>
              </Card>
            </MotiView>
          ))}
        </ScrollView>

        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }}>
          <Card className="bg-purple/10 border border-purple/30">
            <View className="flex-row items-center mb-4">
              <Sparkles size={24} color="#C4B5FD" className="mr-2" />
              <Text variant="h3">AI Mix Generator</Text>
            </View>
            <Text variant="subtext" className="mb-4">Describe the vibe you want, and AI will create the perfect soundscape.</Text>

            <TextInput
              value={prompt}
              onChangeText={setPrompt}
              placeholder="e.g., A cozy coding environment for rainy nights"
              placeholderTextColor="#A3A3A3"
              className="bg-primary p-4 rounded-xl text-white font-inter mb-4"
              multiline
            />

            <Button
              label={isGenerating ? "Generating..." : "Generate Mix"}
              onPress={handleGenerate}
              disabled={isGenerating || !prompt}
              style={{ opacity: (isGenerating || !prompt) ? 0.5 : 1 }}
            />
          </Card>
        </MotiView>

        {generatedMix && (
          <MotiView from={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }} className="mt-8 mb-8">
            <Card className="bg-secondary border border-purple/50">
              <Text variant="h3" className="mb-4">{generatedMix.title}</Text>
              {generatedMix.layers.map((l: any) => (
                <View key={l.name} className="flex-row justify-between mb-2">
                  <Text className="text-gray-300">{l.name}</Text>
                  <Text className="text-purple">{l.vol}</Text>
                </View>
              ))}
              <Button label="Play Mix" className="mt-6" onPress={playGeneratedMix} />
            </Card>
          </MotiView>
        )}
      </ScrollView>
    </Screen>
  );
}
