import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SettingsState {
  notifications: {
    events: boolean;
    messages: boolean;
    promotions: boolean;
  };
  darkMode: boolean;
  toggleTheme: () => void;
  setNotifications: (settings: Partial<SettingsState['notifications']>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notifications: {
        events: true,
        messages: true,
        promotions: false,
      },
      darkMode: false,
      toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
      setNotifications: (settings) => set((state) => ({
        notifications: { ...state.notifications, ...settings }
      })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);