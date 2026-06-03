import { Pressable, PressableProps, View } from "react-native";
import { styled } from "nativewind";
import { MotiView } from "moti";
import { cn } from "../theme/utils";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";

const StyledPressable = styled(Pressable);
const StyledView = styled(View);

export interface CardProps extends PressableProps {
  children: React.ReactNode;
  interactive?: boolean;
}

export function Card({ children, interactive = false, className, onPress, ...props }: CardProps) {
  const handlePress = useCallback((e: any) => {
    if (interactive) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    if (onPress) onPress(e);
  }, [interactive, onPress]);

  const content = (
    <StyledView className={cn("rounded-3xl bg-secondary p-6 overflow-hidden", className)}>
      {children}
    </StyledView>
  );

  if (!interactive && !onPress) return content;

  return (
    <MotiView
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 200, mass: 0.8 }}
    >
      <StyledPressable onPress={handlePress} {...props}>
        {content}
      </StyledPressable>
    </MotiView>
  );
}
