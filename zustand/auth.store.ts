import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Alert } from 'react-native';

interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  isPremium: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  users: User[];
  login: (credentials: { email: string; pass: string }) => Promise<boolean>;
  signup: (userData: Omit<User, 'id' | 'isPremium'>) => Promise<boolean>;
  logout: () => void;
  upgradeToPremium: () => void;
  updateUser: (data: Partial<User>) => void;
}

const defaultUser: User = {
  id: '1',
  fullName: 'Dada Narimane',
  email: 'user@easyart.com',
  password: 'password',
  phoneNumber: '+213 555 739 123',
  address: 'Alger, Algérie',
  isPremium: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      users: [defaultUser],

      login: async ({ email, pass }) => {
        const users = get().users;
        console.log('users: ', users);
        if (!email || !pass) {
          Alert.alert('Erreur', 'Veuillez fournir un email et un mot de passe.');
          return false;
        }

        const foundUser = users.find(
          u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass
        );
        console.log('foundUser: ', foundUser);

        if (foundUser) {
          set({
            isAuthenticated: true,
            user: foundUser,
            token: `fake-jwt-token-${foundUser.id}`,
          });
          return true;
        }

        Alert.alert('Erreur', 'Email ou mot de passe incorrect.');
        return false;
      },

      signup: async (userData) => {
        const { fullName, email, password, phoneNumber, address } = userData;
        if (!fullName || !email || !password || !phoneNumber || !address) {
          Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Alert.alert('Erreur', 'Veuillez fournir une adresse email valide.');
          return false;
        }

        const users = get().users;
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
          Alert.alert('Erreur', 'Un compte avec cet email existe déjà.');
          return false;
        }

        const newUser: User = {
          id: Date.now().toString(),
          fullName,
          email,
          password,
          phoneNumber,
          address,
          isPremium: false,
        };

        set({
          isAuthenticated: true,
          user: newUser,
          token: `fake-jwt-token-${newUser.id}`,
          users: [...users, newUser],
        });
        return true;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },

      upgradeToPremium: () => {
        set((state) => ({
          user: state.user ? { ...state.user, isPremium: true } : null,
          users: state.users.map(u =>
            u.id === state.user?.id ? { ...u, isPremium: true } : u
          ),
        }));
      },

      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
        users: state.users.map(u => u.id === state.user?.id ? { ...u, ...data } : u),
      })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);