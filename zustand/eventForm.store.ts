import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EventFormState {
  eventName: string;
  address: string;
  category: string;
  description: string;
  price: string;
  imageUri: string | null;
  maxParticipants: string;
  date: string;
  time: string;

  setEventName: (name: string) => void;
  setAddress: (address: string) => void;
  setCategory: (category: string) => void;
  setDescription: (desc: string) => void;
  setPrice: (price: string) => void;
  setImageUri: (uri: string | null) => void;
  setMaxParticipants: (count: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  clearForm: () => void;
}

const initialState = {
  eventName: '',
  address: '',
  category: 'Musique',
  description: '',
  price: '100',
  imageUri: null,
  maxParticipants: '50',
  date: new Date().toISOString(),
  time: new Date().toISOString(),
};

export const useEventFormStore = create<EventFormState>()(
  persist(
    (set) => ({
      ...initialState,
      setEventName: (name) => set({ eventName: name }),
      setAddress: (address) => set({ address: address }),
      setCategory: (category) => set({ category: category }),
      setDescription: (desc) => set({ description: desc }),
      setPrice: (price) => set({ price: price }),
      setImageUri: (uri) => set({ imageUri: uri }),
      setMaxParticipants: (count) => set({ maxParticipants: count }),
      setDate: (date) => set({ date: date }),
      setTime: (time) => set({ time: time }),
      clearForm: () => set(initialState),
    }),
    {
      name: 'event-form-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);