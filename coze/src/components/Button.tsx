import { Pressable, PressableProps } from "react-native";
import { styled } from "nativewind";
import { MotiView } from "moti";
import { Text } from "./Text";
import { cn } from "../theme/utils";
import * as Haptics from "expo-haptics";
import { useCallback } from "react";

const StyledPressable = styled(Pressable);

export interface ButtonProps extends PressableProps {
  label: string;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export function Button({ label, variant = "primary", fullWidth, className, onPress, disabled, ...props }: ButtonProps) {
  const handlePress = useCallback((e: any) => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress(e);
  }, [disabled, onPress]);

  const baseClasses = "items-center justify-center rounded-2xl px-6 py-4";

  const variants = {
    primary: "bg-purple",
    secondary: "bg-secondary",
    outline: "border border-purple bg-transparent",
  };

  const textVariants = {
    primary: "text-white font-semibold",
    secondary: "text-white font-semibold",
    outline: "text-purple font-semibold",
  };

  return (
    <MotiView
      animate={{ scale: 1 }}
      transition={{ type: "spring", damping: 15, stiffness: 200, mass: 0.8 }}
      style={{ width: fullWidth ? "100%" : "auto" }}
    >
      <StyledPressable
        className={cn(baseClasses, variants[variant], fullWidth ? "w-full" : "", className)}
        onPress={handlePress}
        disabled={disabled}
        {...props}
      >
        <Text className={textVariants[variant]}>{label}</Text>
      </StyledPressable>
    </MotiView>
  );
}
