import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// FAKE DATA
const CATEGORIES = [
  { id: '1', name: 'Musique', icon: 'musical-notes-outline', count: 143, color: '#F06060' },
  { id: '2', name: 'Danse', icon: 'body-outline', count: 28, color: '#4682B4' },
  { id: '3', name: 'Théâtre', icon: 'mic-outline', count: 32, color: '#FF7F50' },
  { id: '4', name: 'Photographie', icon: 'camera-outline', count: 67, color: '#39C596' },
  { id: '5', name: 'Art Sonore', icon: 'headset-outline', count: 41, color: '#20B2AA' },
  { id: '6', name: 'Animation', icon: 'easel-outline', count: 52, color: '#FF69B4' },
  { id: '7', name: 'Art Numérique', icon: 'phone-portrait-outline', count: 95, color: '#1E90FF' },
  { id: '8', name: 'Architecture', icon: 'business-outline', count: 35, color: '#A0522D' },
  { id: '9', name: 'Sculpture', icon: 'hammer-outline', count: 24, color: '#778899' },
  { id: '10', name: 'Mode', icon: 'shirt-outline', count: 68, color: '#9370DB' },
];

const ARTISTS = [
  { id: '1', name: 'Amina Belkacem', job: 'Artiste peintre', rating: 4.8, location: 'Alger', price: '2,500 DA/h', image: 'https://i.pravatar.cc/150?img=25', category: 'Art Visuel', bio: 'Passionnée par les couleurs vives et les textures, Amina explore l\'abstrait à travers des œuvres qui captent l\'énergie de la nature algérienne.' },
  { id: '2', name: 'Yacine Messaoudi', job: 'Photographe mariage', rating: 4.8, location: 'Oran', price: '15,000 DA/event', image: 'https://i.pravatar.cc/150?img=1', category: 'Photographie', bio: 'Yacine immortalise vos moments les plus précieux avec une approche cinématographique et une attention particulière à l\'émotion.' },
  { id: '3', name: 'Fatima Zerouki', job: 'Chef pâtissière', rating: 4.9, location: 'Constantine', price: '3,000 DA/h', image: 'https://i.pravatar.cc/150?img=32', category: 'Cuisine', bio: 'Yacine immortalise vos moments les plus précieux avec une approche cinématographique et une attention particulière à l\'émotion.' },
  { id: '4', name: 'Salim Mehenni', job: 'Guitariste & Compositeur', rating: 4.9, location: 'Alger', price: '3,500 DA/h', image: 'https://i.pravatar.cc/150?img=52', category: 'Musique', bio: 'Yacine immortalise vos moments les plus précieux avec une approche cinématographique et une attention particulière à l\'émotion.' },
  { id: '5', name: 'Karim Bennani', job: 'Cinéaste Documentaire', rating: 4.7, location: 'Tlemcen', price: '20,000 DA/projet', image: 'https://i.pravatar.cc/150?img=60', category: 'Cinéma', bio: 'Yacine immortalise vos moments les plus précieux avec une approche cinématographique et une attention particulière à l\'émotion.' },
];

const EVENTS = [
  {
    id: '1',
    title: 'Exposition de Peinture Moderne',
    description: 'Découvrez les œuvres d\'artistes contemporains algériens',
    rating: 4.8,
    date: '25 Janvier 2025',
    time: '14:00',
    location: 'Galerie d\'Art, Alger Centre',
    participants: 45,
    maxParticipants: 80,
    price: '500 DA',
    image: 'https://place.abh.ai/s3fs-public/placeholder/DSC_0219_400x400.JPG',
    category: 'Art Visuel',
    artistId: '1',
  },
  {
    id: '2',
    title: 'Concert de Musique Andalouse',
    description: 'Une soirée inoubliable avec les maîtres de la musique andalouse.',
    rating: 4.9,
    date: '15 Février 2025',
    time: '20:00',
    location: 'Opéra d\'Alger',
    participants: 150,
    maxParticipants: 300,
    price: '1200 DA',
    image: 'https://plus.unsplash.com/premium_photo-1682310198275-37334114371d?q=80&w=400',
    category: 'Musique',
    artistId: '2',

  }
];

const CREATIONS = [
  { id: '1', artistId: '1', title: 'Portrait au fusain', date: '15 Jan 2025', likes: 24, image: 'https://images.unsplash.com/photo-1599749001385-e753366a15ec?w=500&q=80' },
  { id: '2', artistId: '1', title: 'Paysage urbain', date: '12 Jan 2025', likes: 18, image: 'https://images.unsplash.com/photo-1519923834699-ef0b78f43147?w=500&q=80' },
  { id: '3', artistId: '2', title: 'Nature morte', date: '10 Jan 2025', likes: 31, image: 'https://images.unsplash.com/photo-1579803815617-165b42828699?w=500&q=80' },
];

const FAKE_CHATS = {
  '1': [ // Chat history with artist '1' (Amina Belkacem)
    { _id: 1, text: 'Bonjour! J\'admire beaucoup votre travail.', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), user: { _id: 'currentUser' } },
    { _id: 2, text: 'Bonjour, merci beaucoup! C\'est très gentil.', createdAt: new Date(Date.now() - 23 * 60 * 60 * 1000), user: { _id: '1', name: 'Amina Belkacem' } }
  ],
  '2': [ // Chat history with artist '2' (Yacine Messaoudi)
    { _id: 3, text: 'Salut, je suis intéressé par vos services pour un mariage.', createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), user: { _id: 'currentUser' } },
  ]
}

interface DataState {
  categories: typeof CATEGORIES;
  artists: typeof ARTISTS;
  events: typeof EVENTS;
  creations: typeof CREATIONS;
  favorites: string[];
  favoriteEvents: string[];
  addEvent: (event: Omit<typeof EVENTS[0], 'id' | 'rating'>) => void;
  toggleFavorite: (artistId: string) => void;
  toggleEventFavorite: (eventId: string) => void;
  chats: { [artistId: string]: Message[] }; 
  sendMessage: (artistId: string, text: string) => void;
  resetData: () => void; 

}


interface Message {
  _id: string | number;
  text: string;
  createdAt: Date;
  user: {
    _id: string | number;
    name: string;
    avatar?: string;
  }
}

const initialState = {
  categories: CATEGORIES,
  artists: ARTISTS,
  events: EVENTS,
  creations: CREATIONS,
  favorites: [],
  favoriteEvents: [],
  chats: FAKE_CHATS,
};
const STORE_NAME = 'data-storage';

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      ...initialState, 

      addEvent: (event) => set((state) => ({
        events: [{ ...event, id: Date.now().toString(), rating: 4.0 }, ...state.events]
      })),
      toggleFavorite: (artistId) => set((state) => {
        const favorites = state.favorites.includes(artistId)
          ? state.favorites.filter(id => id !== artistId)
          : [...state.favorites, artistId];
        return { favorites };
      }),
      toggleEventFavorite: (eventId) => set((state) => {
        const favoriteEvents = state.favoriteEvents.includes(eventId)
          ? state.favoriteEvents.filter(id => id !== eventId)
          : [...state.favoriteEvents, eventId];
        return { favoriteEvents };
      }),
      // @ts-ignore
      chats: FAKE_CHATS,
      sendMessage: (artistId, text) => {
        const newMessage: Message = {
          _id: Math.random(),
          text,
          createdAt: new Date(),
          // @ts-ignore
          user: { _id: 'currentUser' }
        };
        set(state => {
          const newChats = { ...state.chats };
          const currentChat = newChats[artistId] ? [newMessage, ...newChats[artistId]] : [newMessage];
          newChats[artistId] = currentChat;
          return { chats: newChats };
        });
        setTimeout(() => {
          const artistReply: Message = {
            _id: Math.random(),
            text: 'Merci pour votre message! Je vous répondrai dès que possible.',
            createdAt: new Date(),
            // @ts-ignore
            user: { _id: artistId }
          };
          set(state => {
            const newChats = { ...state.chats };
            const currentChat = newChats[artistId] ? [artistReply, ...newChats[artistId]] : [artistReply];
            newChats[artistId] = currentChat;
            return { chats: newChats };
          });
        }, 2000);
      },
      resetData: async () => {
        try {
          await AsyncStorage.removeItem(STORE_NAME);
          // @ts-ignore
          set(initialState, true); 
        } catch (error) {
          console.error("Error resetting data store:", error);
        }
      },
    }),
    {
      name: STORE_NAME,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
