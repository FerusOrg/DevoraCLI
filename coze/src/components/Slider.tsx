import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, runOnJS, withSpring } from "react-native-reanimated";
import { Text } from "./Text";
import * as Haptics from "expo-haptics";
import { memo } from "react";

interface SliderProps {
  label: string;
  value: number;
  onValueChange: (val: number) => void;
}

export const Slider = memo(function Slider({ label, value, onValueChange }: SliderProps) {
  const width = 200; // Fixed width for simplicity in placeholder
  const translateX = useSharedValue(value * width);
  const scale = useSharedValue(1);
  const startX = useSharedValue(0);

  const triggerHaptic = () => {
    Haptics.selectionAsync();
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      scale.value = withSpring(1.2, { damping: 15, stiffness: 300 });
      runOnJS(triggerHaptic)();
    })
    .onUpdate((event) => {
      let nextX = startX.value + event.translationX;
      if (nextX < 0) nextX = 0;
      if (nextX > width) nextX = width;
      translateX.value = nextX;
      runOnJS(onValueChange)(nextX / width);
    })
    .onEnd(() => {
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      runOnJS(triggerHaptic)();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }));

  const knobStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value }
    ]
  }));

  return (
    <View className="mb-6">
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm">{label}</Text>
        <Text className="text-sm text-purple">{Math.round(value * 100)}%</Text>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View className="h-2 bg-secondary rounded-full justify-center" style={{ width }}>
          <Animated.View className="h-full bg-purple rounded-full absolute left-0" style={animatedStyle} />
          <Animated.View className="w-5 h-5 bg-white rounded-full absolute -ml-1 shadow-lg" style={knobStyle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
});
