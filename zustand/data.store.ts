import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// FAKE DATA
const CATEGORIES = [
    { id: '1', name: 'Musique', icon: 'musical-notes', count: 143, color: '#F06060' },
    { id: '2', name: 'Art Visuel', icon: 'color-palette', count: 89, color: '#9C75F6' },
    { id: '3', name: 'Photographie', icon: 'camera', count: 67, color: '#39C596' },
    { id: '4', name: 'Cinéma', icon: 'film', count: 45, color: '#7B3ED2' },
    { id: '5', name: 'Théâtre', icon: 'mic', count: 32, color: '#FF7F50' },
    { id: '6', name: 'Danse', icon: 'body', count: 28, color: '#4682B4' },
    { id: '7', name: 'Littérature', icon: 'book', count: 55, color: '#32CD32' },
    { id: '8', name: 'Cuisine', icon: 'restaurant', count: 74, color: '#FFD700' },
];

const ARTISTS = [
    { id: '1', name: 'Amina Belkacem', job: 'Artiste peintre', rating: 4.8, location: 'Alger', price: '2,500 DA/h', image: 'https://i.pravatar.cc/150?img=25', category: 'Art Visuel' },
    { id: '2', name: 'Yacine Messaoudi', job: 'Photographe mariage', rating: 4.8, location: 'Oran', price: '15,000 DA/event', image: 'https://i.pravatar.cc/150?img=1', category: 'Photographie' },
    { id: '3', name: 'Fatima Zerouki', job: 'Chef pâtissière', rating: 4.9, location: 'Constantine', price: '3,000 DA/h', image: 'https://i.pravatar.cc/150?img=32', category: 'Cuisine' },
    { id: '4', name: 'Salim Mehenni', job: 'Guitariste & Compositeur', rating: 4.9, location: 'Alger', price: '3,500 DA/h', image: 'https://i.pravatar.cc/150?img=52', category: 'Musique' },
    { id: '5', name: 'Karim Bennani', job: 'Cinéaste Documentaire', rating: 4.7, location: 'Tlemcen', price: '20,000 DA/projet', image: 'https://i.pravatar.cc/150?img=60', category: 'Cinéma' },
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
    category: 'Art Visuel'
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
    category: 'Musique'
  }
];

const CREATIONS = [
    { id: '1', title: 'Portrait au fusain', date: '15 Jan 2025', likes: 24, image: 'https://images.unsplash.com/photo-1599749001385-e753366a15ec?w=500&q=80' },
    { id: '2', title: 'Paysage urbain', date: '12 Jan 2025', likes: 18, image: 'https://images.unsplash.com/photo-1519923834699-ef0b78f43147?w=500&q=80' },
    { id: '3', title: 'Nature morte', date: '10 Jan 2025', likes: 31, image: 'https://images.unsplash.com/photo-1579803815617-165b42828699?w=500&q=80' },
];

interface DataState {
    categories: typeof CATEGORIES;
    artists: typeof ARTISTS;
    events: typeof EVENTS;
    creations: typeof CREATIONS;
    favorites: string[]; // Favorite Artists
    favoriteEvents: string[]; // --- NEW: Favorite Events
    addEvent: (event: Omit<typeof EVENTS[0], 'id' | 'rating'>) => void;
    toggleFavorite: (artistId: string) => void;
    toggleEventFavorite: (eventId: string) => void; // --- NEW: Function for event favorites
}

export const useDataStore = create<DataState>()(
    persist(
        (set) => ({
            categories: CATEGORIES,
            artists: ARTISTS,
            events: EVENTS,
            creations: CREATIONS,
            favorites: [],
            favoriteEvents: [], // --- Initialize new array
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
        }),
        {
            name: 'data-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
