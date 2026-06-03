import { useEffect, useState } from "react";
import { View, Image, Dimensions, ScrollView } from "react-native";
import { Screen } from "../../src/components/Screen";
import { Text } from "../../src/components/Text";
import { MotiView } from "moti";
import { Play, Pause, SlidersHorizontal, Heart, Clock, X } from "lucide-react-native";
import { Card } from "../../src/components/Card";
import { Slider } from "../../src/components/Slider";
import { audioService } from "../../src/services/AudioService";

const { height, width } = Dimensions.get('window');

// Placeholders for demo since we don't have actual assets loaded
const AUDIO_ASSETS = {
  rain: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  fire: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  wind: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
};

export default function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showMixer, setShowMixer] = useState(false);
  const [volumes, setVolumes] = useState({ rain: 0.6, fire: 0.3, wind: 0.1 });

  useEffect(() => {
    async function setupAudio() {
      await audioService.init();
      await audioService.loadLayer("rain", AUDIO_ASSETS.rain, volumes.rain);
      await audioService.loadLayer("fire", AUDIO_ASSETS.fire, volumes.fire);
      await audioService.loadLayer("wind", AUDIO_ASSETS.wind, volumes.wind);
    }

    setupAudio();

    return () => {
      audioService.unloadAll();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) audioService.pauseAll();
    else audioService.playAll();
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (layer: string, val: number) => {
    setVolumes(prev => ({ ...prev, [layer]: val }));
    audioService.setVolume(layer, val);
  };

  return (
    <Screen className="p-0 bg-black">
      <View style={{ height: height * 0.65, width }} className="relative">
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop" }}
          style={{ width: '100%', height: '100%', opacity: 0.7 }}
        />
        <View className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </View>

      <View className="flex-1 px-8 -mt-20 z-10 justify-between pb-10">
        <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: "spring", delay: 200 }}>
          <Text variant="h1" className="text-center mb-2">Midnight Study</Text>
          <Text variant="subtext" className="text-center text-gray-300">Focus • Rain • Fireplace</Text>
        </MotiView>

        <MotiView from={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", delay: 400 }} className="flex-row items-center justify-between px-4">
          <Card interactive onPress={() => setShowMixer(true)} className="p-4 rounded-full bg-secondary/80">
            <SlidersHorizontal size={24} color="white" />
          </Card>

          <Card interactive onPress={togglePlay} className="p-6 rounded-full bg-purple">
            {isPlaying ? <Pause size={32} color="white" fill="white" /> : <Play size={32} color="white" fill="white" />}
          </Card>

          <Card interactive className="p-4 rounded-full bg-secondary/80">
            <Heart size={24} color="white" />
          </Card>
        </MotiView>
      </View>

      {/* Mix Builder Modal */}
      {showMixer && (
        <MotiView
          from={{ translateY: height }}
          animate={{ translateY: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="absolute bottom-0 left-0 right-0 h-3/4 bg-primary rounded-t-3xl p-6 z-50 border-t border-secondary"
        >
          <View className="flex-row justify-between items-center mb-8">
            <Text variant="h2">Mix Builder</Text>
            <Card interactive onPress={() => setShowMixer(false)} className="p-2 rounded-full bg-secondary">
              <X size={24} color="white" />
            </Card>
          </View>

          <ScrollView>
            <Slider label="Heavy Rain" value={volumes.rain} onValueChange={(v) => handleVolumeChange("rain", v)} />
            <Slider label="Campfire" value={volumes.fire} onValueChange={(v) => handleVolumeChange("fire", v)} />
            <Slider label="Soft Wind" value={volumes.wind} onValueChange={(v) => handleVolumeChange("wind", v)} />
          </ScrollView>
        </MotiView>
      )}
    </Screen>
  );
}
