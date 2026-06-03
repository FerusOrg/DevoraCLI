import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { styled } from "nativewind";
import { cn } from "../theme/utils";
import { memo } from "react";

const StyledText = styled(RNText);

export interface TextProps extends RNTextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "subtext";
}

export const Text = memo(function Text({ className, variant = "body", ...props }: TextProps) {
  const baseClasses = "font-inter text-white";

  const variants = {
    h1: "text-4xl font-bold tracking-tight",
    h2: "text-3xl font-semibold tracking-tight",
    h3: "text-2xl font-semibold tracking-tight",
    body: "text-base font-normal",
    subtext: "text-sm text-grayText font-normal",
  };

  return (
    <StyledText
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    />
  );
});
