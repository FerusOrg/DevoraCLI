import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { cn } from "../theme/utils";

const StyledSafeAreaView = styled(SafeAreaView);

export interface ScreenProps extends SafeAreaViewProps {
  children: React.ReactNode;
}

export function Screen({ children, className, ...props }: ScreenProps) {
  return (
    <StyledSafeAreaView className={cn("flex-1 bg-primary", className)} {...props}>
      {children}
    </StyledSafeAreaView>
  );
}
