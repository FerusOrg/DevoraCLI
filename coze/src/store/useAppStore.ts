import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppState {
  hasCompletedOnboarding: boolean;
  selectedGoals: string[];
  completeOnboarding: (goals: string[]) => void;
  resetOnboarding: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      selectedGoals: [],
      completeOnboarding: (goals) => set({ hasCompletedOnboarding: true, selectedGoals: goals }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false, selectedGoals: [] }),
    }),
    {
      name: 'coze-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
